import React from 'react';

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
        <Die />
        <Label />
        <BetDisplay />
      </div>
    )
  }
}

export default PlayerGUI