import React, { useEffect, useState, useRef } from 'react';

/*This is the YT Data api request for first 50 video on a playlist. My API key is here
https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLB50737D8A7BF7BF4&key=AIzaSyCZuVb4_kTsIKbDBDGMM-KDRnIHyUoJyvw
*/

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
  const [loadingPage, setLoadingPage] = useState(true)
  const events = useRef([])

  const loggedIn = Auth.loggedIn();

  //get user data from local storage
  const data = useRef((loggedIn) ? JSON.parse(localStorage.getItem('TubeSimData')) : defaultData);
  const [ovrScn, setOvrScn] = useState({
    horShift: data.current.horShift,
    vertShift: data.current.vertShift,
    horSize: data.current.horSize,
    vertSize: data.current.vertSize
  })
  const [currentCh, setCurrentCh] = useState(data.current.currentCh);
  const chRef = useRef(currentCh);

  const [curVol, setCurVol] = useState(data.current.volume)
  const volRef = useRef(curVol);
  //----Key Input Functions----//

  const logKeyUp = (e) => {
    switch (e.key) {
      case ".": case ",":
        setMenuHover(0);
        setMenuToggle(old => (!old));
        setMenuSelection("list");
        break;
      case "ArrowRight":
        if (menuSelection === 'list') {
          setMenuHover(last => {
            return (last === 2 && menuHover <= 2) ? (0) : (last + 1);
          })
        }
        break;
      case "ArrowLeft":
        if (menuSelection === 'list') {
          setMenuHover(last => {
            return (last === 0 && menuHover <= 2) ? (2) : (last - 1);
          })
        }
        break;
      case "Enter":
        setMenuHover(current => {
          switch (current) {
            case 0: setMenuSelection("edit");
              break;
            case 1: setMenuSelection("overscan");
              break;
            case 2: setMenuSelection("list");
              break;
            default:
          }
          return 4;
        })
        break;
      case "+": case "-":
        const direction = (e.key === "+") ? (1) : (-1);;
        const videos = document.querySelectorAll(".video")
        setCurrentCh(old => {
          let next = (old + direction);
          if (old === videos.length - 1 && e.key === "+") next = 0;
          if (next < 0 && e.key === "-") next = videos.length - 1;
          chRef.current = next;
          videos[next].style.display = 'block';
          videos[old].style.display = 'none';
          events.current[old].mute();
          events.current[next].unMute();
          events.current[chRef.current].setVolume(volRef.current);
          return next;
        })
        break;
      case "*": case "/":
        setCurVol(old => {
          let val = (e.key === "*") ? 4 : -4;
          val = old + val;
          if (val> 100) val = 100;
          if (val< 0) val = 0;
          volRef.current = val;
          events.current[chRef.current].setVolume(val);
          return val;
        })
        break;
      default:
    }
  }
console.log('Vol: ', curVol)
  //--Prep--/
  useEffect(() => {

    //listen for window being unloaded and save local data if so
    window.addEventListener("beforeunload", function (e) {
      if (loggedIn) {
        console.log('SAVING BEFORE CLOSE!');
        let local = JSON.parse(localStorage.getItem('TubeSimData'));
        local.currentCh = chRef.current;
        console.log(local);
        localStorage.setItem('TubeSimData', JSON.stringify(local))
        updateStats({ variables: { localStats: localStorage.getItem('TubeSimData') } });
      }
    }, false);
    //listen for when page finishes loading all content
    window.addEventListener("load", () => {
      window.addEventListener("keyup", logKeyUp);
      setLoadingPage(false);
      const videos = document.querySelectorAll(".video");
      videos[data.current.currentCh].style.display = "block";
      events.current[currentCh].unMute();
    })
  }, [])

  //--JSX--//
  if (loading) return 'Saving Data...';
  if (error) return `Submission error! ${error.message}`;

  const volumeRender = () => {
    let result = "["
    for (let i = 0; i < curVol/4; i++) {
      const char = (i===12) ? "|" : "-";
      result +=char;
    }
    result +="]";
    return result;
  }
  return (
    <main>
      <div id="chDisplay" key={`Z${currentCh}${menuToggle}`}>{`${data.current.channels[currentCh].name}`}</div>
      <div id="volDisplay" key={`volume${curVol}`} >{` ${volumeRender()}` }</div>
      <VideoFrame data={data} events={events} loadingPage={loadingPage} ovrScn={ovrScn} >
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


