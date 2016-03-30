'use strict';

import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ViewPane from '../view-pane';

class CreateTagModal extends Component {
  render () {
    const { modalVisible, closeModal, saveChanges } = this.props;
    return (
      <div className='static-modal'>
        <Modal show={modalVisible} onHide={closeModal}>
          <Modal.Header>
            <Modal.Title>Create a new Tag</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ViewPane />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={closeModal}>Close</Button>
            <Button onClick={() => { saveChanges(); closeModal(); }} bsStyle='primary'>Save changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

CreateTagModal.propTypes = {
  modalVisible: PropTypes.bool,
  closeModal: PropTypes.func,
  saveChanges: PropTypes.func
};

export default CreateTagModal;
