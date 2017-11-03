import React from 'react'
import Die from "../PlayerGUI/Die";
import { Row, Col  } from 'react-bootstrap';



class Cup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      diceValues : props.diceValues,
    };
  }

  render() {
    return (
      <div>
        <Row>
          <Col md={4}>
            <Die dieValue={this.state.diceValues[0]} />
          </Col>
          <Col md={4}>
            <Die dieValue={this.state.diceValues[1]} />
          </Col>
          <Col md={4}>
            <Die dieValue={this.state.diceValues[2]} />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Die dieValue={this.state.diceValues[3]} />
          </Col>
          <Col md={4}>
            <Die dieValue={this.state.diceValues[4]} />
          </Col>
        </Row>
      </div>
      //this.state.diceValues.map(value =>
      //  <Die key={value} dieValue={value} />
      //)
    )
  };
}

export default Cup