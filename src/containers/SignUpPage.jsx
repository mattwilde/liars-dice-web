import React from 'react';
import SignUpForm from '../components/SignUpForm.jsx';
import PublicHeader from '../components/PublicHeader';
import { Redirect } from 'react-router';

class SignUpPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: ''
      },
      redirect: null,
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
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
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // send signup form data to server to be validated.
    fetch(`/auth/signup`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        name: this.state.user.name,
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

            // set a message
            localStorage.setItem('successMessage', body.message);
        
            // make a redirect
            this.setState({ redirect: '/login' });
            // this.context.router.history.push('/login');
          }
          else { // failure
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
        <SignUpForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.state.errors}
          user={this.state.user}
        />
      </div>
    );
  }

}

export default SignUpPage;