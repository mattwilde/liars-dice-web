import React from 'react';
import ReactDOM from 'react-dom';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import './style.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';

import DashboardPage from './containers/DashboardPage';
import HomePage from './components/HomePage';
import SignUpPage from './containers/SignUpPage';
import LoginPage from './containers/LoginPage';
import LogoutPage from './containers/LogoutPage';

// import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
// import routes from './server/routes.js';


import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// import AppBar from 'material-ui/AppBar';

import Auth from './modules/Auth';

darkBaseTheme.fontFamily = 'Lato, sans-serif';
console.log(darkBaseTheme);
// const App = () => (
//   <div>App
//     <Link to='/about' >About</Link>
//   </div>
// )

// const About = () => (
//   <div>About
//     <Link to='/' >App</Link>
//   </div>
// )

ReactDOM.render((
  // <Router routes={routes} />
<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
  <BrowserRouter>
  <div>
  {/* <AppBar title="My AppBar" /> */}
    {/* <Route exact path='/' component={HomePage} /> */}
    <Route exact path='/' component={(location, callback) => {
        if (Auth.isUserAuthenticated()) {
          return <DashboardPage />;
        } else {
          return <HomePage />;
        }
      }} />
    <Route path='/signup' component={SignUpPage} />
    <Route path='/login' component={LoginPage} />
    <Route path='/logout' component={LogoutPage} />
  </div>
  </BrowserRouter>
  </MuiThemeProvider>
),
  document.getElementById('root')
);


// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// <BrowserRouter>
// <div>
//   <Route path='/' component={App} />
// </div>
// </BrowserRouter>