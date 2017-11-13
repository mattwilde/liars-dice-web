import React from 'react'
import BidModal from '../PlayerGUI/BidModal'
import { Grid, Row, Col, ButtonToolbar, Button  } from 'react-bootstrap';

class BettingButtons extends React.Component {
  render() {
    console.log(this.props.gameActions)
    return (
      <div>
        <ButtonToolbar>
          <Button bsSize="small" onClick={this.props.gameActions.onClickPass}>PASS</Button>
          <Button bsSize="small">CHALLENGE</Button>
        </ButtonToolbar> 
      </div>
    )
  };
}

export default BettingButtons