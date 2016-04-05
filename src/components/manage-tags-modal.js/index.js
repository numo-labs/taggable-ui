import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import LinkedTags from '../linked-tags';

class ManageTagsModal extends Component {
  render () {
    const { modalVisible, closeModal, saveChanges } = this.props;
    return (
      <div className='static-modal'>
        <Modal show={modalVisible} onHide={closeModal}>
          <Modal.Header>
            <Modal.Title>Create a new Tag</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LinkedTags />
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

ManageTagsModal.propTypes = {
  modalVisible: PropTypes.bool,
  saveChanges: PropTypes.func,
  closeModal: PropTypes.func
};

export default ManageTagsModal;
