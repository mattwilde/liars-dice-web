import React from 'react';
import Auth from '../../modules/Auth';
import PublicHeader from '../../components/PublicHeader';
import Config from '../../modules/Config';
import GameActions from '../../modules/GameActions';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader, CardText} from 'material-ui/Card';

const styles = {
  raisedButton: {margin: 12},
};

class TestGUI extends React.Component {
  constructor(props) {
    super(props);
    
    // get all state props
    this.state = props.state;

    // get calculated props
    this.setState({ isCurrentPlayer: props.isCurrentPlayer });

    this.gameActions = new GameActions({
      matchId: props.state.matchId,
      socket: props.state.socket,
    });
  }

  componentWillReceiveProps = (props) => {
    this.setState(props.state);
    this.setState({ isCurrentPlayer: props.isCurrentPlayer });
    console.log('componentWillReceiveProps', this.state);

    // push socket down to game actions.
    this.gameActions.socket = this.state.socket;
  }

  render() {
    const users = this.state.users;
    if (typeof users !== 'undefined') {
      console.log(users);
      var playerGUIS = users.map(user => {
        //return <li><PlayerGUI user={user}/></li>
        return (
          <Card>
            <CardHeader
              title="Player"
              subtitle={user._id}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <div>
                {'{'}
                <pre>  _id: {user._id}</pre>
                <pre>  table_position: {user.table_position}</pre>
                <pre>  connection_status: {user.connection_status}</pre>
                <pre>  chip_amount: {user.chip_amount}</pre>
                <Card>
                  <CardHeader
                    title="Dice"
                    subtitle=""
                    actAsExpander={true}
                    showExpandableButton={true}
                  />
                  <CardText expandable={true}>
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
                  </CardText>
                </Card>
                {'},'}
              </div>
            </CardText>
        </Card>
        );
      });
    } else {
      var playerGUIS = 'Waiting for players to join match...'
    }

    return (
      <div>
        <PublicHeader /> {// this is here for quick and easy home button for quick testing nav
        }
        <Card>
          <CardHeader
            title="Match"
            subtitle={this.state.matchId}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <div>
              <pre>  mode: {this.state.mode}</pre>          
              <pre>  active_table_position: {this.state.activeTablePosition}</pre>
              <pre>  pot: {this.state.pot}</pre>
              <pre>  min_bet: {this.state.minBet}</pre>
              <pre>  max_bet: {this.state.maxBet}</pre>
              <pre>  max_buy_in: {this.state.maxBuyIn}</pre>
            </div>        
          </CardText>
        </Card>
          <div>
            {playerGUIS}
          </div>

        <RaisedButton label="Bid"
          onClick={this.gameActions.onClickBid}
          primary={true} 
          // disable if not current player
          disabled={!this.state.isCurrentPlayer}
          style={styles.raisedButton} />
        <RaisedButton label="Pass"
          onClick={this.gameActions.onClickPass}
          primary={true} 
          // disable if not current player
          disabled={!this.state.isCurrentPlayer}
          style={styles.raisedButton} />
    </div>
    );
  };
}

export default TestGUI