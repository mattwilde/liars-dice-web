import React from 'react';
import Auth from '../modules/Auth';
import Home from '../components/Home.jsx';
import PublicHeader from '../components/PublicHeader';
// import Config from '../modules/Config';

class HomePage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      user: Auth.getUser(),
      modeValue: 'casual',
      serverValue: 'public',
      matchmakingStatus: 'Idle',
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    // fetch(`${Config.getDbUrl()}/api/dashboard`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization':`bearer ${Auth.getToken()}`,
    //   },
    //   method: "GET",
    // })
    //   .then(res => {
    //     res.json().then(body => { // failure
    //       if (res.status === 200) { // success
    //         this.setState({
    //           secretData: body.message
    //         });
    //       }
    //       else {
    //         console.log(`/api/dashboard request failed.`);
    //       }
    //     });
    //   })
    //   .catch(res => console.log(`Unexpected error.  /api/dashboard request failed.`, res));  
  }

  handlers = {
    handleModeChange: (event, index, modeValue) => this.setState({modeValue}),
    handleServerChange: (event, index, serverValue) => this.setState({serverValue}),
    handleClickFindMatch: () => { this.setState({matchmakingStatus: `Looking for match... \n(mode: ${this.state.modeValue}, server: ${this.state.serverValue})`})},
  };
  
  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <PublicHeader />
        <Home user={this.state.user} state={this.state} handlers={this.handlers} />
      </div>
    );
  }

}

export default HomePage;