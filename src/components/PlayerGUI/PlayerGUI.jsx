import React from 'react';
import Cup from "../PlayerGUI/Cup";
import Label from "../PlayerGUI/Label";
import BetDisplay from "../PlayerGUI/BetDisplay";
import BettingButtons from "../PlayerGUI/BettingButtons";
import { Grid, Row, Col  } from 'react-bootstrap';

const DIE_POSSIBILITES = [
  'STAR',
  'TWO' ,
  'THREE', 
  'FOUR',
  'FIVE',
  'SIX' 
]

class PlayerGUI extends React.Component {
  constructor(props) {
    super(props);
    //Do we need a state here? Everything comes from this.props.user
    this.state = {
      gameActions: this.props.gameActions,
      user: this.props.user,
      userid: this.props.user._id,
      //initiate a random array of dice values,
      //GamePage should do this eventually???
      userDice: this.props.user.dice,//Array.from({length: 5}, () => DIE_POSSIBILITES[Math.floor(Math.random() * 6)]),
      userName: "Johns",//this.props.userName
      //random amount for now, 
      //will come from match.users.{userid}.chips or something
      userChips: this.props.user.chip_amount,//Math.floor(Math.random()*1000),
    };
  }

  render() {
    console.log(this.props.gameActions)
    return (
      <div>
          <Row>
            <Col md={12}>
              <Cup dice={this.state.userDice}/>            
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <BettingButtons gameActions={this.props.gameActions} />           
            </Col>
            <Col md={6}>
                <p>Total chips: {this.state.userChips}</p>
                <p>Position: {this.state.user.table_position}</p>
            </Col>
          </Row>
      </div>
    )
  }
}

export default PlayerGUI