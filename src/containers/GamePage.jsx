import React from 'react';
import Auth from '../modules/Auth';
import BoardImage from '../components/BoardImage.jsx';
import PublicHeader from '../components/PublicHeader';

class GamePage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      matchid: null,
      modeValue: null,
      serverValue: null,
    };
  }

  render() {
    return (
      <div>
        <PublicHeader />
        <BoardImage />
      </div>
    );
  }
}

export default GamePage