import React, { useRef } from 'react';
import Auth from '../utils/auth';

const Menu = (props) => {
  const {current: data} = useRef(JSON.parse(localStorage.getItem('TubeSimData')));
  console.log(data)
  //get localStorage

  if (Auth.loggedIn()) {
    return (
      <>
          <ul id='channelList'>
          {data.channels.map((e,i) => {
           return  <li className='chListItem' key={i}>{e.name}</li>
          })}
        </ul>

        <div>Channel Edit</div>
        <div>OverScan</div>
        <div>Clear Watch History</div>
      </>
    );
  } else {
    return (
      <>
        <div>MENU</div>

      </>
    );

  }





};

export default Menu;
