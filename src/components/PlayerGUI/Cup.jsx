import React from 'react'
import Die from "../PlayerGUI/Die";

class Cup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      diceValues : ['STAR','TWO','THREE','FOUR','FIVE','SIX'],
    };
  }
  render() {
    return (
      this.state.diceValues.map(value =>
        <Die key={value} dieValue={value} />
      )
    )
  };
}

export default Cup