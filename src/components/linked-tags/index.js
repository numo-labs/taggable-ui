import React, { Component, PropTypes } from 'react';
import TagList from '../tag-list';
import { AddTagButton as Button } from '../button';
import Modal from '../manage-tags-modal';

require('./styles.css');
class LinkedTags extends Component {
  constructor () {
    super();
    this.state = {
      manageTagsModalVisible: false
    };
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  showModal () {
    this.setState({manageTagsModalVisible: true});
  }

  closeModal () {
    this.setState({manageTagsModalVisible: false});
  }

  render () {
    const {
      props: { listItems, onTagClick, selectedTagId }
     } = this;
    const { manageTagsModalVisible } = this.state;

    return (
      <div>
        <TagList
          listItems={listItems}
          handleTagClick={onTagClick}
          selectedTagId={selectedTagId}
        />
        <Button
          onClick={this.showModal}
          text='Modify tags'
        />
        <Modal modalVisible={manageTagsModalVisible} closeModal={this.closeModal} saveChanges={this.saveChanges}/>
      </div>
    );
  }
}

LinkedTags.propTypes = {
  listItems: PropTypes.array,
  onTagClick: PropTypes.func,
  selectedTagId: PropTypes.string
};

LinkedTags.defaultProps = {
  listItems: []
};

export default LinkedTags;
