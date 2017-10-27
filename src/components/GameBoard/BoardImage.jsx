import React from 'react';
import Auth from '../../modules/Auth';
import boardImage from '../../images/board.jpg';

function BoardImage(props) {
  return (
    <div>
      <img src={boardImage} alt="" />
    </div>
  );
}

export default BoardImage