import React from 'react';
import Auth from '../modules/Auth';
import Home from '../components/Home.jsx';
import PublicHeader from '../components/PublicHeader';
import Config from '../modules/Config';

class HomePage extends React.Component {
  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);
    this.state = {
      user: Auth.getUser(), //TODO: This probably shouldn't be a state? (maw)

      // matchmaking states
      modeValue: 'casual',
      serverValue: 'public',
      lookingForMatchString: `Looking for match... \n(mode: casual, server: public)`,
      isFindingMatch: false,
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentWillMount() {
    // check if user is currently in queue and update state if they are.
    this.isUserInQueue();
  }

  handlers = {
    handleModeChange: (event, index, modeValue) => { // event handler for changing matchmaking mode
      this.setState({modeValue});
      this.setState({ lookingForMatchString: `Looking for match... \n(mode: ${this.state.modeValue}, server: ${this.state.serverValue})`}); // need to update matchmaking string if mode changes.
    },
    //TODO: can probably get rid of server for now... not really using and will need a lot of extra work to support (maw)
    handleServerChange: (event, index, serverValue) => { // event handler for changing matchmaking server
      this.setState({serverValue});
      this.setState({ lookingForMatchString: `Looking for match... \n(mode: ${this.state.modeValue}, server: ${this.state.serverValue})`}); // need to update matchmaking string if server changes.
    },
    handleClickFindMatch: () => { // event handler for clicking Find Match button
      this.addUserToQueue();
    },
    handleClickCancelMatch: () => { // event handler for clicking Cancel finding match button
      this.removeUserFromQueue();
    },
  };
  
  /**
   * adds the current user to the queue.  updates state 'isFindingMatch' to true to indicate to UI 
   * that user is currently finding match.
   */
  addUserToQueue = () => {
    fetch(`${Config.getDbUrl()}/db/matchmaking_queued_users`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        userId: this.state.user._id,
        mode: this.state.modeValue,
      }),
    })
      .then(res => {
        res.json().then(body => { // failure
          if (res.status === 201) { // success
            console.log('User added to the queue');
            this.setState({ isFindingMatch: true });
          }
          else {
            if (body.code === 11000) { // if user already in queue...
              console.log('User already in queue');
            }
            else {
              console.log(`Unexpected error: ${body.errmsg}`);
            }
          }
        });
      })
      .catch(res => console.log('fail',res));
  };

  /**
   * removes the current user from the queue.  updates state 'isFindingMatch' to indicate to UI 
   * whether user is currently finding match.
   */
  removeUserFromQueue = () => {
    fetch(`${Config.getDbUrl()}/db/matchmaking_queued_users/${this.state.user._id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "DELETE",
    })
      .then(res => {
        res.json().then(body => { // failure
          if (res.status === 200) { // success
            console.log('User deleted from the queue');
            // change the component-container state
            this.setState({ isFindingMatch: false });
          }
          else {
            console.log(`Unexpected error: ${body.errmsg}`);
          }
        });
      })
      .catch(res => console.log('fail',res));
  };
  
  /**
   * checks if the current user is in the matchmaking queue.  updates state 'isFindingMatch' to indicate to UI 
   * whether user is currently finding match.
   */
  isUserInQueue = () => {
    fetch(`${Config.getDbUrl()}/db/matchmaking_queued_users/${this.state.user._id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "GET",
    })
      .then(res => {
        res.json().then(body => { // failure
          if (res.status === 200) { // success
            console.log('User is currently in the queue');
            this.setState({ isFindingMatch: true });
          }
          else if (res.status === 404) {
            console.log('User not currently in the queue');
            this.setState({ isFindingMatch: false });            
          }
          else {
            console.log(`Unexpected error: ${body.errmsg}`);
          }
        });
      })
      .catch(res => console.log('fail',res));
  };

  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <PublicHeader />
        <Home user={this.state.user.name} state={this.state} handlers={this.handlers} />
      </div>
    );
  }

}

export default HomePage;