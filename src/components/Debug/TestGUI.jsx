import React from 'react';
import Auth from '../../modules/Auth';
import PublicHeader from '../../components/PublicHeader';
import Config from '../../modules/Config';
import GameActions from '../../modules/GameActions';
import RaisedButton from 'material-ui/RaisedButton';
// import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';

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
    this.setState({ bidCount: -1 });
    this.setState({ bidFace: -1 });
    this.setState({ showFace: -1 });

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

    
      // console.log(users);
      var playerGUIS = users.map(user => {
        //return <li><PlayerGUI user={user}/></li>
        return (
          <Card>
            <CardHeader
              title="Player"
              subtitle={`Cup [${user.dice && user.dice.filter(die => !die.lost && die.hidden).map(die => die.face).join(', ')}], ` +
                              `Shown: ${user.dice && user.dice.filter(die => !die.lost && !die.hidden).map(die => die.face).join(', ')}`}
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
                
                  <pre>  previous_action: {JSON.stringify(user.previous_action)
                    // let action = '';
                  // action += user.previous_action && user.previous_action.bid ? `bid: { count: ${user.previous_action.bid.count}, face: ${user.previous_action.bid.count} }\n` : '';
                  // action += user.previous_action && user.previous_action.pass ? `pass: true\n` : '';
                  // action += user.previous_action && user.previous_action.reroll ? `reroll: { dice_held: [${user.previous_action.reroll.dice_held.join(', ')}], \nrolled_dice: [${user.previous_action.reroll.rolled_dice.map(x => x.face).join(', ')}]}` : '';
        
                  } </pre>
                
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
            subtitle={`Active Position: ${this.state.activeTablePosition}, Pot: ${this.state.pot}`}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <div>
              <pre>  _id: {this.state.matchId}</pre>          
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

        <Card>
          <CardHeader
            title="Bid"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <div expandable={true}>
          <CardText>
            <TextField 
              hintText="How many?"
              /* value={this.state.bidCount} */
              onChange={e => this.setState({ bidCount: parseInt(e.target.value) })}
            />
            <br />
            <TextField 
              hintText="Of what die face?"
              /* value={this.state.bidFace} */
              onChange={e => this.setState({ bidFace: parseInt(e.target.value) })}
            />
          </CardText>
          <CardActions>
            <RaisedButton label="Bid"
              onClick={() => {this.gameActions.onClickBid({count: this.state.bidCount, face: this.state.bidFace});}}
              primary={true} 
              // disable if not current player
              disabled={!this.state.isCurrentPlayer}
              style={styles.raisedButton} />
          </CardActions>
          </div>
        </Card>
        <Card>
          <CardHeader
            title="Bid and Reroll"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <div expandable={true}>
          <CardText>
            <TextField 
              hintText="How many?"
              /* value={this.state.bidCount} */
              onChange={e => this.setState({ bidCount: parseInt(e.target.value) })}
            />
            <br />
            <TextField 
              hintText="Of what die face?"
              /* value={this.state.bidFace} */
              onChange={e => this.setState({ bidFace: parseInt(e.target.value) })}
            />
            <br />
            <TextField 
              hintText="Show all dice with what number? (all stars are held in addition to the #)"
              fullWidth={true}
              /* value={this.state.bidFace} */
              onChange={e => this.setState({ showFace: parseInt(e.target.value) })}
            />
          </CardText>
          <CardActions>
            <RaisedButton label="Bid and Reroll"
              onClick={() => {
                let userIdx = this.state.users.findIndex(x => x.table_position === this.state.activeTablePosition);
                let shownDice = this.state.users[userIdx].dice.filter(x => !x.lost && x.hidden && (x.face == this.state.showFace || x.face == 1)).map(x => x._id); // grabs dice of face specified and stars
                this.gameActions.onClickBidAndReroll({count: this.state.bidCount, face: this.state.bidFace}, shownDice);}}
              primary={true} 
              // disable if not current player
              disabled={!this.state.isCurrentPlayer}
              style={styles.raisedButton} />
          </CardActions>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Challenge"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <div expandable={true}>
          <CardText>
            <TextField 
              hintText="How much to bet/raise? (Only applies to Bet/Raise button)"
              /* value={this.state.bidCount} */
              onChange={e => this.setState({ challengeBet: parseInt(e.target.value) })}
            />
          </CardText>
          <CardActions>
            <RaisedButton label="Bet"
              onClick={() => {this.gameActions.onClickChallengeBet(this.state.challengeBet);}}
              primary={true} 
              // disable if not current player
              disabled={!this.state.isCurrentPlayer}
              style={styles.raisedButton} />
          </CardActions>
          <CardActions>
            <RaisedButton label="Call"
              onClick={() => {this.gameActions.onClickChallengeCall();}}
              primary={true} 
              // disable if not current player
              disabled={!this.state.isCurrentPlayer}
              style={styles.raisedButton} />
          </CardActions>
          </div>
        </Card>
        <RaisedButton label="Pass"
          onClick={() => {this.gameActions.onClickPass()}}
          primary={true} 
          // disable if not current player
          disabled={!this.state.isCurrentPlayer}
          style={styles.raisedButton} />
    </div>
    );
  };
}

export default TestGUI