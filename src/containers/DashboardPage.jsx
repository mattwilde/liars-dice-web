import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import PublicHeader from '../components/PublicHeader';

class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      secretData: ''
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    console.log(Auth.getToken());
    fetch(`/api/dashboard`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`bearer ${Auth.getToken()}`,
      },
      method: "GET",
    })
      .then(res => {
        res.json().then(body => { // failure
          if (res.status === 200) { // success
            this.setState({
              secretData: body.message
            });
          }
          else {
            console.log(`/api/dashboard request failed.`);
          }
        });
      })
      .catch(res => console.log(`Unexpected error.  /api/dashboard request failed.`, res));  
      
      
    // const xhr = new XMLHttpRequest();
    // xhr.open('get', '/api/dashboard');
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // // set the authorization HTTP header
    // xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    // xhr.responseType = 'json';
    // xhr.addEventListener('load', () => {
    //   if (xhr.status === 200) {
    //     this.setState({
    //       secretData: xhr.response.message
    //     });
    //   }
    // });
    // xhr.send();
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <PublicHeader />
        <Dashboard secretData={this.state.secretData} />
      </div>
    );
  }

}

export default DashboardPage;