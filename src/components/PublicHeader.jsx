import React from 'react';
import { NavLink } from 'react-router-dom';
import Auth from '../modules/Auth';

const PublicHeader = () => (
  <div>
    <div className="top-bar">

      <div className="top-bar-left">
        <NavLink to="/">Liars Dice X</NavLink>
      </div>


      {Auth.isUserAuthenticated() ? (
        <div className="top-bar-right">
          <NavLink to="/logout">Log out</NavLink>
        </div>
      ) : (
        <div className="top-bar-right">
          <NavLink to="/login">Log in</NavLink>
          <NavLink to="/signup">Sign up</NavLink>
        </div>
      )}

      {/* <div className="top-bar-right">
        <NavLink to="/login">Log in</NavLink>
        <NavLink to="/signup">Sign up</NavLink>
      </div> */}


    </div>
  </div>
);

export default PublicHeader;