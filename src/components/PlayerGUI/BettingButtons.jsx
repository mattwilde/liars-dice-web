import React from 'react'
import { Grid, Row, Col, ButtonToolbar, Button  } from 'react-bootstrap';

class BettingButtons extends React.Component {
  render() {
    console.log(this.props.gameActions)
    return (
      <ButtonToolbar fluid={true}>
        <Button bsSize="large" onClick={this.props.gameActions.onClickPass}>PASS</Button>
        <Button bsSize="large">CHALLENGE</Button>
      </ButtonToolbar>
    )
  };
}

export default BettingButtons