import React from 'react';
import Auth from '../modules/Auth';
import BoardImage from '../components/GameBoard/BoardImage.jsx';
import PublicHeader from '../components/PublicHeader';
import Config from '../modules/Config';
import socketIOClient from "socket.io-client";
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader, CardText} from 'material-ui/Card';

const styles = {
  raisedButton: {margin: 12},
};

class GamePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      serverValue: null,
      socket: null,
      
      // connectedUsers: [],
      
      // from current-matches collection
      matchId: props.match.params.matchId,  // match._id
      mode: null,                           // match.mode
      minBet: -1,                           // match.minBet
      maxBet: -1,                           // match.maxBet
      maxBuyIn: -1,                         // match.maxBuyIn

      users: [], // users should be in correct table position order

      activeTablePosition: -1,
      pot: 0,
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
        this.setState({users: match.users});
        // this.setState({users: match.users.map(x => x._id)}); // set users.
        // this.setState({connectedUsers: match.users.filter(x => x.connection_status === 'connected').map(x => x._id)}); // set users.
      }
      else {
        console.log('You gave me a 7th person.... idiot.'); // figure out exactly how to log this...
        // socket.emit('error', new Error('You gave me a 7th person.... idiot.'));
      }
      
      // connect to websocket
      let socket = socketIOClient(`${Config.getDbUrl()}`);
      socket.emit('join-match', { matchId: this.state.matchId, userId: Auth.getUser()._id })

      socket.on('match-user-connected', user => {
        console.log('SOCKET RECEIVE:', 'match-user-connected', user);
        const users = this.state.users;
        let userIdx = users.findIndex(x => x._id === user._id);
        users[userIdx].connection_status = user.connection_status;
        this.setState({users: users});
      });

      socket.on('active-table-position', newActivePosition => {
        console.log('SOCKET RECEIVE:', 'active-table-position', newActivePosition);
        this.setState({activeTablePosition: newActivePosition});
      });

      socket.on('player-action-pass', data => {
        console.log('SOCKET RECEIVE:', 'player-action-pass', data);
        const users = this.state.users;
        // update state
        let userIdx = users.findIndex(x => x._id === data._id);
        users[userIdx].previous_action = data.previous_action;
        users[userIdx].chip_amount = data.chip_amount;
        this.setState({users: users});
        this.setState({pot: data.pot});
        this.setState({activeTablePosition: data.active_table_position});
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
    this.state.socket.emit('active-table-position', {matchId: this.state.matchId, activeTablePosition: newActiveTablePosition});
  }

  onClickPass = () => {
    let data = { matchId: this.state.matchId, userId: Auth.getUser()._id };
    console.log('SOCKET EMIT TO SERVER:', 'player-action-pass', data);
    this.state.socket.emit('player-action-pass', data);
  }

  render() {
    const users = this.state.users;
    if (typeof users !== 'undefined') {
      console.log(users);
      var playerGUIS = users.map(user => {
        //return <li><PlayerGUI user={user}/></li>
        return (
          <div>
            {'{'}
            <pre>  _id: {user._id}</pre>
            <pre>  table_position: {user.table_position}</pre>
            <pre>  connection_status: {user.connection_status}</pre>
            <pre>  chip_amount: {user.chip_amount}</pre>
            <pre>  dice: {user.dice ? '' : 'null'}</pre>
            
            {user.dice && user.dice.map(die => {
              return (
                <div>
                  <pre>    {'{'}</pre>
                  <pre>      _id: {die._id}</pre>
                  <pre>      face: {die.face}</pre>
                  <pre>      hidden: {die.hidden.toString()}</pre>
                  <pre>      lost: {die.lost.toString()}</pre>
                  <pre>    {'},'}</pre>
                </div>
              );
            })}
            {'},'}
          </div>
        );
      });
    } else {
      var playerGUIS = 'Waiting for players to join match...'
    }

    var isCurrentPlayer = false;
    if (users && users.length > 0) {
        console.log('here', Auth.getUser()._id, users);
        let playerIndex = users.findIndex(x=> x._id === Auth.getUser()._id);
        console.log('PLAYER INDEX:', playerIndex)
        console.log(users[playerIndex]);
        isCurrentPlayer = this.state.activeTablePosition === users[playerIndex].table_position;
    }

    return (
      <div>
        <PublicHeader /> {// this is here for quick and easy home button for quick testing nav
        }
        <Card>
          <CardHeader
            title="State Data"
            subtitle=""
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
        
          Match properties
          <div>
            <pre>  mode: {this.state.mode}</pre>          
            <pre>  active_table_position: {this.state.activeTablePosition}</pre>          
          </div>        
          Match Players
          <div>
            {playerGUIS}
          </div>
          </CardText>
        </Card>

        <RaisedButton label="Next Player"
          onClick={this.onClickNextPlayer}
          primary={true} 
          style={styles.raisedButton} />
        <RaisedButton label="Pass"
          onClick={this.onClickPass}
          primary={true} 
          // disable if not current player
          disabled={!isCurrentPlayer}
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