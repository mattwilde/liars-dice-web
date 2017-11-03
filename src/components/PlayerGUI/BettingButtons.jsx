import React from 'react'
import { Grid, Row, Col, ButtonToolbar, Button  } from 'react-bootstrap';

class BettingButtons extends React.Component {
  render() {
    return (
      <ButtonToolbar fluid={true}>
        <Button bsSize="large" >PASS</Button>
        <Button bsSize="large">CHALLENGE</Button>
      </ButtonToolbar>
    )
  };
}

export default BettingButtons