import React, { Component, PropTypes } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import LinkedTagsList from '../linked-tags-list';
import SearchList from '../search-list';
import './styles.css';

class ManageTagsModal extends Component {
  render () {
    const {
      modalVisible,
      closeModal,
      saveChanges,
      listItems,
      handleTagClick,
      selectedTagId
     } = this.props;
    return (
      <div className='static-modal'>
        <Modal show={modalVisible} onHide={closeModal} dialogClassName='manageTagsModal'>
          <Modal.Header>
            <Modal.Title>Modify Tags</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Row>
            <Col xs={6}>
            <SearchList />
            </Col>
            <Col xs={6}>
            <LinkedTagsList
              listItems={listItems}
              handleTagClick={handleTagClick}
              selectedTagId={selectedTagId}
            />
            </Col>
          </Row>
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
  closeModal: PropTypes.func,
  listItems: PropTypes.array,
  handleTagClick: PropTypes.func,
  selectedTagId: PropTypes.string
};

export default ManageTagsModal;
