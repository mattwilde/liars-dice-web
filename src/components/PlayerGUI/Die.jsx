import React from 'react'

class Die extends React.Component {
  constructor(props) {
    super(props);
    this.setDieValue = this.setDieValue.bind(this);
  }

  setDieValue(value) {
    this.props.onDieValueChange(e.target.value)
  }

  render() {
    return(
    <div>
      <img src={this.props.dieValue} alt=""/>        
    </div>
    )
  }
}

export default Die