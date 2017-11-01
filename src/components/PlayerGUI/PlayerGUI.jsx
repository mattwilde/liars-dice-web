import React from 'react';
import Cup from "../PlayerGUI/Cup";
import Label from "../PlayerGUI/Label";
import BetDisplay from "../PlayerGUI/BetDisplay";

class PlayerGUI extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  render() {


    return (
      <div>
        <Cup />
        <Label />
        <BetDisplay />
      </div>
    )
  }
}

export default PlayerGUI