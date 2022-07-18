import React, { useState, useRef, useEffect } from 'react';

/*This is the YT Data api request for first 50 video on a playlist. My API key is here
https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLB50737D8A7BF7BF4&key=AIzaSyCZuVb4_kTsIKbDBDGMM-KDRnIHyUoJyvw
*/

import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME_STATS } from '../utils/queries';
import { UPDATE_USER_STATS } from '../utils/mutations';

import Menu from './Menu';

const Home = ({client}) => {
  // fetch("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLKE9oP_rYnRdLhG3HW__6ytTwvgSBM9pu&key=AIzaSyCZuVb4_kTsIKbDBDGMM-KDRnIHyUoJyvw").then(response => response.json())
  //   .then(data => console.log(data));
  const [updateStats, { updatedData, loading, error }] = useMutation(UPDATE_USER_STATS);
  const { data: userData } = useQuery(QUERY_ME_STATS);

  const loggedIn = Auth.loggedIn();
  useEffect(() => {
    if (userData) {
      localStorage.setItem('TubeSimData', JSON.stringify(userData.me.stats[0]))
      console.log(JSON.parse(localStorage.getItem('TubeSimData')))
    }

  }, [])




  //------STATES----//

  const [menuToggle, setMenuToggle] = useState(false);

  //----Key Detect Loop----//
  const keyPressed = useRef("");

  const logKeyUp = (e) => {
    keyPressed.current = e.key;

    switch (e.key) {
      case ".": 
      //if menu close, save user data to server
     if (menuToggle) updateStats({ variables: { localStats: localStorage.getItem('TubeSimData') } });
      setMenuToggle(!menuToggle);
        break;
      default:
    }
  };
  //listen for window being closed and save local data if so
  window.addEventListener("beforeunload", function(e){
    console.log('SAVING BEFORE CLOSE!');
    updateStats({ variables: { localStats: localStorage.getItem('TubeSimData') } });
 }, false);

  document.addEventListener("keyup", logKeyUp);

  //--JSX--//
  if (loading) return 'Saving Data...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <main>
      <div className="flex-row justify-space-between">

        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            You're Logged In!
          </div>
        ) : null}

        {(menuToggle) ? <Menu /> : null}

      </div>
    </main>
  );
};

export default Home;


