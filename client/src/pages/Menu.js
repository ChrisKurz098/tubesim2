import React, { useEffect, useState, useRef } from 'react';
import Auth from '../utils/auth';
import List from '../components/Menu/List';
import Edit from '../components/Menu/Edit';
import OverScan from '../components/Menu/Overscan';

const Menu = ({ menuHover, setMenuHover }) => {
  const { current: data } = useRef(JSON.parse(localStorage.getItem('TubeSimData')));
  const [menuSelection, setMenuSelection] = useState("list");

  const logKeyUp = (e) => {
    if (menuHover <= 2) {
      switch (e.key) {
        case "ArrowRight":
          setMenuHover(last => {
            return (last === 2) ? (0) : (last + 1);
          })
          break;
        case "ArrowLeft":
          setMenuHover(last => {
            return (last === 0) ? (2) : (last - 1);
          })
          break;
        case "Enter":
          setMenuHover(current => {
          switch (current) {
            case 0: setMenuSelection("edit")
              break;
            case 1: setMenuSelection("overscan")
              break;
            case 2: setMenuSelection("list")
              break;
            default:
          }
          return 4;
        })

          break;
        default:
      }
    }
  }
  console.log(menuHover)
  useEffect(() => {
    document.addEventListener("keyup", logKeyUp);
  }, [])


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
