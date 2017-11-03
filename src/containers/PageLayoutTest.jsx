import React from 'react';
import { Grid, Row, Col  } from 'react-bootstrap';
import BoardImage from '../components/GameBoard/BoardImage';
import PlayerGUI from '../components/PlayerGUI/PlayerGUI';

class PageLayoutTest extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const gridInstance = (
      <Grid className="main-grid" fluid={true}>
        <Row>
          <Col className="player-gui" md={4}>
            <PlayerGUI />
          </Col>
          <Col className="player-gui" md={4}>
            <PlayerGUI />
          </Col>
          <Col className="player-gui" md={4}>
            <PlayerGUI />
          </Col>
        </Row>
        <Row>
          <Col md={4}>GAME INFO</Col>
          <Col  md={4}>
            <div className="game-board">
              <BoardImage />
            </div>
          </Col>
          <Col md={4}>GAME INFO</Col>
        </Row>
        <Row>
          <Col className="player-gui" md={4}>
            <PlayerGUI />
          </Col>
          <Col className="player-gui" md={4}>
            <PlayerGUI />
          </Col>
          <Col className="player-gui" md={4}>
            <PlayerGUI />
          </Col>
        </Row>
      </Grid>
    )
    return(
      <div>{gridInstance}</div>
    )
  }
}

export default PageLayoutTest