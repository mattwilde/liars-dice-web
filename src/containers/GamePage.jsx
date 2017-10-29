import React from 'react';
import Auth from '../modules/Auth';
import BoardImage from '../components/GameBoard/BoardImage.jsx';
import PublicHeader from '../components/PublicHeader';
import Config from '../modules/Config';
import socketIOClient from "socket.io-client";

class GamePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      matchid: props.match.params.matchId,
      modeValue: null,
      serverValue: null,
      socket: null,
      users: [],
    };
  }
  compenentWillMount() {

  }

  componentDidMount() {
    let socket = socketIOClient(`${Config.getDbUrl()}`);
    socket.emit('joinroom', `match ${this.state.matchid}`)

    socket.on('user-connected', match =>{
      console.log(`Received new match object: ${match}`)
      //Maybe copy users first just in case match gets rekt by memory
      //const match = match.users.slice()
      if(this.state.users.length < 6) {
        this.setState({users: match.users})
      } else {
        socket.emit('error', new Error('You gave me a 7th person.... idiot.'));
      }
    });

    this.setState({ socket: socket });
  }

  componentWillUnmount() {
    // remember to disconnect before leaving this page, otherwise user will be connected multiple times...
    if (this.state.socket) {
      console.log('Disconnecting from socket...');
      this.state.socket.disconnect(true);
    }
  }

  render() {
    const users = this.state.users
    if(typeof users !== 'undefined') {
      var playerGUIS = users.map(function(user){
        //return <li><PlayerGUI user={user}/></li>
        return <li>{user}</li>
      });
    } else {
      var playerGUIS = 'Waiting for players to join match...'
    }

    return (
      <div>
        <ul>
          {playerGUIS}
        </ul>
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