import React, { useEffect, useState } from 'react';

/*This is the YT Data api request for first 50 video on a playlist. My API key is here
https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLB50737D8A7BF7BF4&key=AIzaSyCZuVb4_kTsIKbDBDGMM-KDRnIHyUoJyvw
*/

import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';

import { UPDATE_USER_STATS } from '../utils/mutations';

import Menu from './Menu';

const Home = ({ client, menuToggle, setMenuToggle }) => {
  // fetch("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLKE9oP_rYnRdLhG3HW__6ytTwvgSBM9pu&key=AIzaSyCZuVb4_kTsIKbDBDGMM-KDRnIHyUoJyvw").then(response => response.json())
  //   .then(data => console.log(data));
  const [updateStats, { updatedData, loading, error }] = useMutation(UPDATE_USER_STATS);
  const [menuHover, setMenuHover] = useState(0);

  const loggedIn = Auth.loggedIn();


  //----Key Detect Loop----//

  const logKeyDown = (e) => {

    switch (e.key) {
      case ".":
        setMenuToggle(!menuToggle);
        break;
      default:
    }
  };
  //listen for window being closed and save local data if so
  window.addEventListener("beforeunload", function (e) {
      console.log('SAVING BEFORE CLOSE!');
      updateStats({ variables: { localStats: localStorage.getItem('TubeSimData') } });
  }, false);

  useEffect(() => {
    document.addEventListener("keydown", logKeyDown);
  }, [])

  //--JSX--//
  if (loading) return 'Saving Data...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <main>
      <div className="flex-row justify-space-between">

        {loggedIn ? (
          <div className="col-12 col-lg-3 mb-3">
            You're Logged In!
          </div>
        ) : null}

        {(menuToggle) ? <Menu menuHover={menuHover} setMenuHover={setMenuHover}/> : null}

      </div>
    </main>
  );
};

export default Home;


