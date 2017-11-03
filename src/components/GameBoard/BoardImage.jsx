import React from 'react';
import Auth from '../../modules/Auth';
import { Image  } from 'react-bootstrap';
import boardImage from '../../images/board.jpg';

function BoardImage(props) {
  return (
    <div>
      <Image src={boardImage} alt="Board" responsive />
    </div>
  );
}

export default BoardImage