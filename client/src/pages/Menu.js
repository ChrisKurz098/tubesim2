import React, { useEffect, useState, useRef } from 'react';
import Auth from '../utils/auth';
import List from '../components/Menu/List';
import Edit from '../components/Menu/Edit';
import OverScan from '../components/Menu/Overscan';

const Menu = ({ menuHover, menuSelection, setMenuSelection }) => {
  //get user data from local storage
  const { current: data } = useRef(JSON.parse(localStorage.getItem('TubeSimData')));


  if (Auth.loggedIn()) {
    return (
      <div className={(menuSelection === "overscan") ? ("translucent") : ("")}>
        {(menuSelection === 'list') ? (<List data={data} />) : null}
        {(menuSelection === 'edit') ? (<Edit data={data} />) : null}
        {(menuSelection === 'overscan') ? (<OverScan data={data} />) : null}
        <ul id='menuOptions'>
          <li className={(menuHover === 0) ? ('menuSelect') : ('menuOption')} onClick={() => setMenuSelection("edit")}>Channel Edit</li>
          <li className={(menuHover === 1) ? ('menuSelect') : ('menuOption')} onClick={() => setMenuSelection("overscan")}>OverScan</li>
          <li className={(menuHover === 2) ? ('menuSelect') : ('menuOption')} >Clear Memory</li>
        </ul>

      </div>
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
