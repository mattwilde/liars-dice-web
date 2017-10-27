import React from 'react';
import LoginForm from '../components/LoginForm.jsx';
import PublicHeader from '../components/PublicHeader';
import Auth from '../modules/Auth';
import Config from '../modules/Config';
import { Redirect } from 'react-router';

class LoginPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    // set the initial component state
    this.state = {
      errors: {},
      successMessage,
      user: {
        email: '',
        password: ''
      },
      redirect: null,
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // send signup form data to server to be validated.
    fetch(`${Config.getDbUrl()}/auth/login`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        email: this.state.user.email,
        password: this.state.user.password,
      }),
    })
      .then(res => {
        res.json().then(body => { // failure
          if (res.status === 200) { // success
            // change the component-container state
            this.setState({
              errors: {}
            });

            // save the token
            Auth.authenticateUser(body.token, body.user);
          
            // change the current URL to /
            this.setState({ redirect: '/' });
            // this.context.router.replace('/');
          }
          else {
            let errors = body.errors ? body.errors : {};
            errors.summary = body.message;

            this.setState({
              errors
            });
          }
        });
      })
      .catch(res => console.log('fail',res));
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Render the component.
   */
  render() {
    const { redirect } = this.state;
    
    if (redirect) {
      return <Redirect to={redirect}/>;
    }
    
    return (
      <div>
        <PublicHeader />
        <LoginForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.state.errors}
          successMessage={this.state.successMessage}
          user={this.state.user}
        />
      </div>
    );
  }

}

export default LoginPage;