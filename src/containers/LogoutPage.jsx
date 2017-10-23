import React from 'react';
import Auth from '../modules/Auth';
import { Redirect } from 'react-router';

class LogoutPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);
console.log('hello');
    this.state = {};
  }

  /**
   * This method will be executed before initial rendering.
   */
  componentWillMount() {
    Auth.deauthenticateUser();
    console.log('deauthenticated user.');
  }

  /**
   * Render the component.
   */
  render() {
    return (<Redirect to='/'/>);
  }
}

export default LogoutPage;