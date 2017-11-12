import React from 'react';
import Auth from '../modules/Auth';
import BoardImage from '../components/GameBoard/BoardImage.jsx';
import PublicHeader from '../components/PublicHeader';
import Config from '../modules/Config';
import socketIOClient from "socket.io-client";
import PlayerGUI from "../components/PlayerGUI/PlayerGUI";
import GameActions from '../modules/GameActions';
import { Grid, Row, Col  } from 'react-bootstrap';
import TestGUI from '../components/Debug/TestGUI'; // testing only (maw)

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
      minBet: -1,                           // match.min_bet
      maxBet: -1,                           // match.max_bet
      maxBuyIn: -1,                         // match.max_buy_in
      bettingCap: -1,                       // match.betting_cap
      bettingCount: 0,                      // match.betting_count

      users: [], // users should be in correct table position order

      activeTablePosition: -1,
      pot: 0,
    };
    this.gameActions = new GameActions({
      matchId: props.match.params.matchId,
      socket: this.state.socket,
    });
  }
  
  componentWillMount() {
    //I think this stuff needs to happen here so gameActions gets an active socket
    let socket = socketIOClient(`${Config.getDbUrl()}`, { query: {token: Auth.getToken()}});
    this.setState({ socket: socket });
    this.gameActions.socket = socket;
  }
  
  componentDidMount() {
    // get match and set initial state properties. Don't do anything else until we get initial match info.
    this.getCurrentMatch(this.props.match.params.matchId).then((match) => {
      // once we get a match object...
      // set initial states here:
      this.setState({mode: match.mode}); // set mode.
      if (match.users.length <= 6) {
        this.setState({users: match.users,
          minBet: match.min_bet,
          maxBet: match.max_bet,
          maxBuyIn: match.max_buy_in,
          pot: match.pot,
          bettingCap: match.betting_cap,
          bettingCount: match.betting_count,
        });
        // this.setState({users: match.users.map(x => x._id)}); // set users.
        // this.setState({connectedUsers: match.users.filter(x => x.connection_status === 'connected').map(x => x._id)}); // set users.
      }
      else {
        console.log('You gave me a 7th person.... idiot.'); // figure out exactly how to log this...
        // socket.emit('error', new Error('You gave me a 7th person.... idiot.'));
      }
      
      // connect to websocket
      //maybe use componentWillMount()?
     // let socket = socketIOClient(`${Config.getDbUrl()}`, { query: {token: Auth.getToken()}});
      //this.gameActions.socket = socket;
      let socket = this.state.socket;
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

      socket.on('player-action-bid', data => {
        console.log('SOCKET RECEIVE:', 'player-action-bid', data);
        const users = this.state.users;
        // update state
        let userIdx = users.findIndex(x => x._id === data._id);
        users[userIdx]['previous_action'] = data.previous_action;
        this.setState({users: users});
        this.setState({activeTablePosition: data.active_table_position});
      });

      socket.on('player-action-bid-and-reroll', data => {
        console.log('SOCKET RECEIVE:', 'player-action-bid-and-reroll', data);
        const users = this.state.users;
        // update state
        let userIdx = users.findIndex(x => x._id === data._id);
        users[userIdx]['previous_action'] = data.previous_action;
        users[userIdx]['dice'] = data.dice;
        this.setState({users: users});
        this.setState({activeTablePosition: data.active_table_position});
      });

      socket.on('player-action-challenge-bet', data => {
        console.log('SOCKET RECEIVE:', 'player-action-challenge-bet', data);
        const users = this.state.users;
        // update state
        let userIdx = users.findIndex(x => x._id === data._id);
        users[userIdx]['previous_action'] = data.previous_action;
        this.setState({users: users});
        this.setState({activeTablePosition: data.active_table_position});
        this.setState({bettingCount: data.betting_count});
        this.setState({pot: data.pot});        
      });

      socket.on('player-action-challenge-call', data => {
        console.log('SOCKET RECEIVE:', 'player-action-challenge-call', data);
        const users = this.state.users;
        // update state
        let userIdx = users.findIndex(x => x._id === data._id);
        users[userIdx]['previous_action'] = data.previous_action;
        this.setState({users: users});
        this.setState({activeTablePosition: data.active_table_position}); // this should get set to -1 since on a call, the round is over
        this.setState({bettingCount: data.betting_count});
        this.setState({pot: data.pot}); // this should have all the challenge bets in it now.
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

  calculateIsCurrentPlayer = () => {
    let isCurrentPlayer = false;
    const users = this.state.users;
    if (users && users.length > 0) {
        let playerIndex = users.findIndex(x=> x._id === Auth.getUser()._id);
        isCurrentPlayer = (this.state.activeTablePosition === users[playerIndex].table_position);
    }
    return isCurrentPlayer;
  }

  render() {
    console.log(this.gameActions)
    if (Config.isTestDisplay) {
      return (
        <div>
          <TestGUI state={this.state} isCurrentPlayer={this.calculateIsCurrentPlayer()}/>
        </div>
      )
    }
    else {
      const columns = this.state.users.map(user =>
          <Col className="player-gui" md={4}>
            <PlayerGUI key={user._id} user={user} gameActions={this.gameActions}/>
          </Col>
        )
      
      const gridInstance = (
        <Grid className="main-grid" fluid={true}>
          <Row>
            {columns.slice(0,3)}
          </Row>
          <Row>
            <Col md={4}><br/>Player {this.state.activeTablePosition}'s turn</Col>
            <Col  md={4}>
              <div className="game-board">
                <BoardImage />
              </div>
            </Col>
            <Col md={4}><br/>POT: {this.state.pot}}</Col>
          </Row>
          <Row>
            {columns.slice(3)}
          </Row>
        </Grid>
      )

      return (
        <Grid className="main-grid" fluid={true}>
        <Row>
          {columns.slice(0,3)}
        </Row>
        <Row>
          <Col md={4}><br/>Player {this.state.activeTablePosition}'s turn</Col>
          <Col  md={4}>
            <div className="game-board">
              <BoardImage />
            </div>
          </Col>
          <Col md={4}><br/>POT: {this.state.pot}</Col>
        </Row>
        <Row>
          {columns.slice(3)}
        </Row>
      </Grid>
      )
    }
  }
}

export default GamePage