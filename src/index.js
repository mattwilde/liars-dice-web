import React from 'react';
import ReactDOM from 'react-dom';
// import socketIOClient from "socket.io-client";


import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './style.css';

// import App from './App';
import registerServiceWorker from './registerServiceWorker';

import HomePage from './containers/HomePage';
import LandingPage from './components/LandingPage';
import SignUpPage from './containers/SignUpPage';
import LoginPage from './containers/LoginPage';
import LogoutPage from './containers/LogoutPage';
import GamePage from './containers/GamePage';
//for testing
import PageLayoutTest from './containers/PageLayoutTest'

import { BrowserRouter, Route } from 'react-router-dom';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// import AppBar from 'material-ui/AppBar';

import Auth from './modules/Auth';
darkBaseTheme.fontFamily = 'Lato, sans-serif';

ReactDOM.render((
<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
  <BrowserRouter>
  <div>
    <Route exact path='/' component={(location, callback) => {
        if (Auth.isUserAuthenticated()) {
          return <HomePage />;
        } else {
          return <LandingPage />;
        }
      }} />
    <Route path='/signup' component={SignUpPage} />
    <Route path='/login' component={LoginPage} />
    <Route path='/logout' component={LogoutPage} />
    <Route path='/match/:matchId' component ={GamePage} />
    <Route path ='/fakematch' component = {PageLayoutTest} />
  </div>
  </BrowserRouter>
  </MuiThemeProvider>
),
  document.getElementById('root')
);

registerServiceWorker();
