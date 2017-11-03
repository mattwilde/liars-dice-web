import React from 'react';
import Cup from "../PlayerGUI/Cup";
import Label from "../PlayerGUI/Label";
import BetDisplay from "../PlayerGUI/BetDisplay";

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
    };
  }

  render() {
    return (
      <div>
        <Cup diceValues={this.state.playerDice}/>
        <Label />
        <BetDisplay />
      </div>
    )
  }
}

export default PlayerGUI