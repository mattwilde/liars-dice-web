import React from 'react';
import Auth from '../modules/Auth';
import BoardImage from '../components/GameBoard/BoardImage.jsx';
import PublicHeader from '../components/PublicHeader';

class GamePage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      matchid: this.props.matchid,
      modeValue: null,
      serverValue: null,
    };
  }

  render() {
    return (
      <div className="container">
        <PlayerGUI />
        <PublicHeader />
        <BoardImage />
      </div>
    );
  }
}

export default GamePage