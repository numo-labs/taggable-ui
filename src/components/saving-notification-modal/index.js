'use strict';

import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';

class SavingNotificationModal extends Component {
  render () {
    const { modalVisible, closeModal } = this.props;
    return (
      <div className='static-modal'>
        <Modal show={modalVisible} onHide={closeModal}>
          <Modal.Header>
            <Modal.Title>Changes successfully saved</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Your changes has been successfully saved.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

SavingNotificationModal.propTypes = {
  modalVisible: PropTypes.bool,
  closeModal: PropTypes.func
};

export default SavingNotificationModal;
