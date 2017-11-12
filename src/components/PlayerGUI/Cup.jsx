import React from 'react'
import Die from "../PlayerGUI/Die";
import { Row, Col  } from 'react-bootstrap';



class Cup extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col md={4}>
            <Die key={1} die={this.props.dice[0]} />
          </Col>
          <Col md={4}>
            <Die key={2} die={this.props.dice[1]} />
          </Col>
          <Col md={4}>
            <Die key={3} die={this.props.dice[2]} />
          </Col>
        </Row>
        <Row>
          <Col md={4} mdOffset={2}>
            <Die key={4} die={this.props.dice[3]} />
          </Col>
          <Col md={4}>
            <Die key={5} die={this.props.dice[4]} />
          </Col>
        </Row>
      </div>
      //this.state.diceValues.map(value =>
      //  <Die key={value} die={value} />
      //)
    )
  };
}

export default Cup