import React from 'react';

/*This is the YT Data api request for first 50 video on a playlist. My API key is here
https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLB50737D8A7BF7BF4&key=AIzaSyCZuVb4_kTsIKbDBDGMM-KDRnIHyUoJyvw
*/

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_ME_STATS } from '../utils/queries';

const Home = () => {
fetch("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLKE9oP_rYnRdLhG3HW__6ytTwvgSBM9pu&key=AIzaSyCZuVb4_kTsIKbDBDGMM-KDRnIHyUoJyvw").then(response => response.json())
  .then(data => console.log(data));

  const { data: userData } = useQuery(QUERY_ME_STATS);

  if (userData) {
    localStorage.setItem('TubeSimData',JSON.stringify(userData.me.stats[0]))
    console.log(JSON.parse(localStorage.getItem('TubeSimData')))
  }
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">

        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
          You're Logged In!
          </div>
        ) : null}

      </div>
    </main>
  );
};

export default Home;
