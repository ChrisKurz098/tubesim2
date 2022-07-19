import React, { useRef } from 'react';
import Auth from '../utils/auth';

const Menu = (props) => {
  const { current: data } = useRef(JSON.parse(localStorage.getItem('TubeSimData')));
  console.log(data)
  //get localStorage

  if (Auth.loggedIn()) {
    return (
      <>
        <ul id='channelList'>
          {data.channels.map((e, i) => {
            return <li className='chListItem' key={i}>{e.name}</li>
          })}
        </ul>
        <ul id='menuOptions'>
          <li className='menuOption'>Channel Edit</li>
          <li className='menuOption'>OverScan</li>
          <li className='menuOption'>Clear Memory</li>
        </ul>

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
