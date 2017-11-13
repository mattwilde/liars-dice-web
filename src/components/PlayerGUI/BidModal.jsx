import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle  } from 'react-bootstrap';

class BidModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    }
  }

  render() {
    return (
      <div>
        <Button 
          bsSize='small'
          onClick={this.setState({showModal: true})}
        >
          BID
        </Button>
        <Modal show={this.state.showModal} onHide={this.setState({showModal: false})}>
          <ModalHeader closeButton>
            <ModalTitle>Make a bid</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>Text</p>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default BidModal