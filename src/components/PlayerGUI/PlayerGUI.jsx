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

    this.state = {
      //initiate a random array of dice values,
      //GamePage should do this eventually???
      playerDice: Array.from({length: 5}, () => DIE_POSSIBILITES[Math.floor(Math.random() * 6)]),
      playerName: "Johns",//this.props.playerName
      //random amount for now, 
      //will come from match.users.{userid}.chips or something
      playerChips: Math.floor(Math.random()*1000),
    };
  }

  render() {
    return (
      <div>
          <Row>
            <Col md={12}>
              <Cup diceValues={this.state.playerDice}/>            
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <BettingButtons></BettingButtons>            
            </Col>
            <Col md={6}>
                <p>Total chips: {this.state.playerChips}</p>

            </Col>
          </Row>
      </div>
    )
  }
}

export default PlayerGUI