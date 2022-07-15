import React from 'react';
import { Navigate } from 'react-router-dom';


import { useQuery } from '@apollo/client';
import { QUERY_ME_STATS } from '../utils/queries';

import Auth from '../utils/auth';

const Menu = (props) => {


  const { data: userData } = useQuery(QUERY_ME_STATS);

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
