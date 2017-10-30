import React from 'react';
import Auth from '../modules/Auth';
import BoardImage from '../components/GameBoard/BoardImage.jsx';
import PublicHeader from '../components/PublicHeader';
import Config from '../modules/Config';
import socketIOClient from "socket.io-client";
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  raisedButton: {margin: 12},
};

class GamePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      matchid: props.match.params.matchId,
      mode: null,
      serverValue: null,
      socket: null,
      users: [], // users should be in correct table position order
      connectedUsers: [],
      activeTablePosition: -1,
    };
  }
  
  componentWillMount() {
  }
  
  componentDidMount() {
    // get match and set initial state properties. Don't do anything else until we get initial match info.
    this.getCurrentMatch(this.props.match.params.matchId).then((match) => {
      // once we get a match object...
      // set initial states here:
      this.setState({mode: match.mode}); // set mode.
      if (match.users.length <= 6) {
        this.setState({users: match.users.map(x => x._id)}); // set users.
        this.setState({connectedUsers: match.users.filter(x => x.connection_status === 'connected').map(x => x._id)}); // set users.
      }
      else {
        console.log('You gave me a 7th person.... idiot.'); // figure out exactly how to log this...
        // socket.emit('error', new Error('You gave me a 7th person.... idiot.'));
      }
      
      // connect to websocket
      let socket = socketIOClient(`${Config.getDbUrl()}`);
      socket.emit('joinroom', { room: `match ${this.state.matchid}`, userId: Auth.getUser()._id })

      socket.on('match-user-connected', user => {
        console.log(`Received new user object`, user);

        // update user connections in the state.
        let connectedUsers = this.state.connectedUsers;

        if (user.connection_status === 'connected' && !connectedUsers.includes(user._id)) { // if user sent down is connected and not part of connected user array, then add them
          connectedUsers.push(user._id);
          this.setState({connectedUsers: connectedUsers });
        }
        else if (user.connection_status !== 'connected' && connectedUsers.includes(user._id)) { // if user sent down is NOT connected then remove them from connected user array
          connectedUsers.splice(connectedUsers.indexOf(user._id), 1);
        }
      });

      // handle active-table-position updates
      socket.on('active-table-position', newActivePosition => {
        console.log('PUSH FROM SERVER:', 'active-table-position', newActivePosition);
        this.setState({activeTablePosition: newActivePosition});
      });

      this.setState({ socket: socket });
    }).catch(e => {
      console.log('CATCH', e);
    });  
  }

  componentWillUnmount() {
    // remember to disconnect before leaving this page, otherwise user will be connected multiple times...
    if (this.state.socket) {
      console.log('Disconnecting from socket...');
      this.state.socket.disconnect(true);
    }
  }

  /**
   * gets a current match by id
   */
  getCurrentMatch = (matchId) => {
    return new Promise( (resolve, reject) => {
      try {
        fetch(`${Config.getDbUrl()}/db/current_matches/${matchId}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "GET",
        })
          .then(res => {
            res.json().then(body => { // failure
              console.log('CHECK RESPONSE', res, body);
              if (res.status === 200) { // success
                console.log(`Found match '${matchId}'`);
                return resolve(body);        
              }
              else if (res.status === 404) {
                console.log('Could not find match!!');
              }
              else {
                console.log(`Unexpected error: ${body.errmsg}`);
              }
            });
          })
          .catch(res => console.log('Unexpected error requesting current match.', res));
      }
      catch (e) {
        console.log('ERROR', e);
        return reject(e);
      }
    });
  };

  //TODO: This is just for testing out functionality before UI is totally built out. will need to remove at some point... (maw)
  onClickNextPlayer = () => {
    let newActiveTablePosition = 1;
    if (this.state.users.length === this.state.activeTablePosition) {
      newActiveTablePosition = 1;
      this.setState({ activeTablePosition: newActiveTablePosition });
    }
    else {
      newActiveTablePosition = this.state.activeTablePosition + 1;
      this.setState({ activeTablePosition: newActiveTablePosition });
    }

    //push update to server 
    this.state.socket.emit('active-table-position', {matchId: this.state.matchid, activeTablePosition: newActiveTablePosition});
  }

  render() {
    const users = this.state.users;
    if (typeof users !== 'undefined') {
      console.log(users);
      var playerGUIS = users.map((user, index) => {
        //return <li><PlayerGUI user={user}/></li>
        return (
          <div>
            {'{'}
            <pre>  _id: {user}</pre>
            <pre>  table_position: {index + 1}</pre>
            <pre>  connection_status: {this.state.connectedUsers.indexOf(user) !== -1 ? 'connected' : 'not connected'}</pre>
            {'},'}
          </div>
        );
      });
    } else {
      var playerGUIS = 'Waiting for players to join match...'
    }

    return (
      <div>
        Match properties
        <div>
          <pre>  mode: {this.state.mode}</pre>          
          <pre>  active_table_position: {this.state.activeTablePosition}</pre>          
        </div>        
        Match Players
        <div>
          {playerGUIS}
        </div>

        <RaisedButton label="Next Player"
                onClick={this.onClickNextPlayer}
                primary={true} 
                style={styles.raisedButton} />
      </div>
    )
    //  <div className="container">
    //    <PlayerGUI />
    //    <PublicHeader />
    //    <BoardImage />
    //  </div>
    //)
  }
}

export default GamePage