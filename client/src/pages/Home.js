import React, { useEffect, useState, useRef } from 'react';

/*This is the YT Data api request for first 50 video on a playlist. My API key is here
https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLB50737D8A7BF7BF4&key=AIzaSyCZuVb4_kTsIKbDBDGMM-KDRnIHyUoJyvw
*/

import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';

import { UPDATE_USER_STATS } from '../utils/mutations';

import Menu from './Menu';
import VideoFrame from '../components/VideoFrame/VideoFrame';

const Home = ({ client, menuToggle, setMenuToggle }) => {
  const [updateStats, { updatedData, loading, error }] = useMutation(UPDATE_USER_STATS);
  const [menuHover, setMenuHover] = useState(0);
  const [menuSelection, setMenuSelection] = useState("list");

    //get user data from local storage
  const { current: data } = useRef(JSON.parse(localStorage.getItem('TubeSimData')));

  const loggedIn = Auth.loggedIn();


  //----Key Input Functions----//

  const logKeyUp = (e) => {
    switch (e.key) {
      case ".":
        setMenuHover(0);
        setMenuToggle(old => (!old));
        setMenuSelection("list");
        break;
      case "ArrowRight":
        setMenuHover(last => {
          return (last === 2 && menuHover <= 2) ? (0) : (last + 1);
        })
        break;
      case "ArrowLeft":
        setMenuHover(last => {
          return (last === 0 && menuHover <= 2) ? (2) : (last - 1);
        })
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
      default:
    }

  }

  //listen for window being unloaded and save local data if so
  window.addEventListener("beforeunload", function (e) {
    console.log('SAVING BEFORE CLOSE!');
    updateStats({ variables: { localStats: localStorage.getItem('TubeSimData') } });
  }, false);

  useEffect(() => {
    document.addEventListener("keyup", logKeyUp);
  }, [])

  //--JSX--//
  if (loading) return 'Saving Data...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <main>
        <VideoFrame data={data}/>
        {(menuToggle) ? <Menu menuHover={menuHover} menuSelection={menuSelection} setMenuSelection={setMenuSelection} data={data} /> : null}
      
    </main>
  );
};

export default Home;


