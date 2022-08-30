import React, { useEffect, useState, useRef } from 'react';

import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';

import { UPDATE_USER_STATS } from '../utils/mutations';

import Menu from './Menu';
import VideoFrame from '../components/VideoFrame/VideoFrame';
import defaultData from '../utils/defautData';

const Home = ({ client, menuToggle, setMenuToggle }) => {

  const [updateStats, { updatedData, loading, error }] = useMutation(UPDATE_USER_STATS);
  const [menuHover, setMenuHover] = useState(0);
  const [menuSelection, setMenuSelection] = useState("list");
  const [loadingPage, setLoadingPage] = useState(true);
  const [chInput, setChInput] = useState('');
  const events = useRef([]);

  const loggedIn = Auth.loggedIn();

  //get user data from local storage
  const data = useRef((loggedIn) ? JSON.parse(localStorage.getItem('TubeSimData')) : defaultData);
  const [ovrScn, setOvrScn] = useState({
    horShift: data.current.horShift,
    vertShift: data.current.vertShift,
    horSize: data.current.horSize,
    vertSize: data.current.vertSize
  });
  const [currentCh, setCurrentCh] = useState((data.current.currentCh > data.current.maxCh) ? data.current.maxCh - 1 : data.current.currentCh);
  const chRef = useRef(currentCh);

  const [curVol, setCurVol] = useState(data.current.volume)
  const volRef = useRef(curVol);
  //----Key Input Functions----//

  const logKeyUp = (e) => {

    if (!isNaN(parseInt(e.key))) { //if they key pressed is a number...
      setChInput(old => {
        let input = (old.toString().length === "") ? e.key.toString() : old + e.key;
        if (input.toString().length >= 2) {  //if the current input is a 2 digit number...
          if (input < 1 || input > data.current.maxCh) return "";//and if the input is between 1 and the last channel
          setCurrentCh(last => { //...changge the channel
            const next = parseInt(input) - 1;
            events.current[next].unMute(); //unpute new channel
            events.current[last].mute(); //mute the last channel
            chRef.current = next; //update the current channel ref
            return next;
          });
          return ""; //clear input after chnaging channel
        }
        return input;
      })
      return; //if the number is not 2 digits long change nothing
    }
    //check if pressed key contols the app
    switch (e.key) {
      //open menu
      case ".": case ",":
        setMenuHover(0);
        setMenuToggle(old => (!old));
        setMenuSelection("list");
        break;
      //control selection
      case "ArrowRight":
        if (menuSelection === 'list') {
          setMenuHover(last => {
            return (last === 3 && menuHover <= 3) ? (0) : (last + 1);
          })
        }
        break;
      case "ArrowLeft":
        if (menuSelection === 'list') {
          setMenuHover(last => {
            return (last === 0 && menuHover <= 3) ? (3) : (last - 1);
          })
        }
        break;
      //select current selection
      case "Enter":
        setMenuHover(current => {
          switch (current) {
            case 0: setMenuSelection("edit");
              break;
            case 1: setMenuSelection("overscan");
              break;
            case 2: setMenuSelection("list");
              break;
            case 3: saveToServer();
              break;
            default:
          }
          return 4;
        })
        break;
      //change channel
      case "+": case "-": case "PageUp": case "PageDown":
        const direction = (e.key === "+" || e.key === "PageUp") ? (1) : (-1);
        const videos = document.querySelectorAll(".video")
        setCurrentCh(old => {
          let next = (old + direction);
          if (old === videos.length - 1 && direction > 0) next = 0;
          if (next < 0 && direction < 0) next = videos.length - 1;
          chRef.current = next;
          events.current[old].mute();
          events.current[next].unMute();
          events.current[chRef.current].setVolume(volRef.current);
          return next;
        })
        break;
      //change volume
      case "*": case "/": case "[": case "]":
        setCurVol(old => {
          let val = (e.key === "*" || e.key === "]") ? 4 : -4;
          val = old + val;
          if (val > 100) val = 100;
          if (val < 0) val = 0;
          volRef.current = val;
          events.current[chRef.current].setVolume(val);
          return val;
        })
        break;
      //skip the current episode
      case "End":
        events.current[chRef.current].nextVideo();
        break
      default:

    }
  }
  //Save to server function
  function saveToServer(e) {
    if (loggedIn) {
      console.log('SAVING....');
      let local = JSON.parse(localStorage.getItem('TubeSimData'));
      local.currentCh = chRef.current;
      console.log(local);
      localStorage.setItem('TubeSimData', JSON.stringify(local));
      updateStats({ variables: { localStats: localStorage.getItem('TubeSimData') } });
      setMenuToggle(old => (false));
    }
  };
  //--Prep--/
  useEffect(() => {
    window.addEventListener("unload", () => {
      //save current channel
    });

    //listen for when page finishes loading all content
    window.addEventListener("load", () => {
      window.addEventListener("keyup", logKeyUp);
      setLoadingPage(false);
      const videos = document.querySelectorAll(".video");
      videos[currentCh].style.display = "block";
      events.current[currentCh].unMute();
    })
  }, [])

  //Render loading/saving indicator//
  if (loading) return 'Saving Data...';
  if (error) return `Submission error! ${error.message}`;

  //function to render the volume bar
  const volumeRender = () => {
    let result = "["
    for (let i = 0; i < curVol / 4; i++) {
      const char = (i === 12) ? "|" : "-";
      result += char;
    }
    result += "]";
    return result;
  }

  //----JSX----//
  return (
    <main>
     
      <div id="chDisplay" key={`Z${currentCh}${menuToggle}${chInput}`}>{(chInput === '') ? `${data.current.channels[currentCh].name}` : `Ch: ${chInput}`}</div>
      <div id="volDisplay" key={`volume${curVol}`} >{` ${volumeRender()}`}</div>
      <VideoFrame data={data} events={events} loadingPage={loadingPage} ovrScn={ovrScn} currentCh={currentCh} >
      </VideoFrame>
      {(menuToggle) ? <Menu
        menuHover={menuHover}
        menuSelection={menuSelection}
        setMenuSelection={setMenuSelection}
        data={data}
        ovrScn={ovrScn}
        setOvrScn={setOvrScn}
        setMenuHover={setMenuHover}
      /> : null}

    </main>
  );
};

export default Home;


