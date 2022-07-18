import React from 'react';
import Auth from '../utils/auth';

const Menu = (props) => {


//get localStorage

  if (Auth.loggedIn()) {
    return (
      <>
      <div>MENU</div>
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
