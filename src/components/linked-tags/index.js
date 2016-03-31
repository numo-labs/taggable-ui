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
       listItems,
       onTagClick,
       selectedTagId,
       searchResults,
       search,
       setSelectedTagFromSearch,
       setSearchTerm,
       searchTerm
    } = this.props;
    console.log('******', listItems);
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
          text='* Modify linked tags'
          />
        <Modal
          listItems={listItems}
          modalVisible={manageTagsModalVisible}
          closeModal={this.closeModal}
          saveChanges={this.saveChanges}
          onSearchSubmit={search}
          setSearchTerm={setSearchTerm}
          onTagClick={setSelectedTagFromSearch}
          searchResults={searchResults}
          searchTerm={searchTerm}
        />
      </div>
    );
  }
}

LinkedTags.propTypes = {
  listItems: PropTypes.array,
  onTagClick: PropTypes.func,
  selectedTagId: PropTypes.string,
  searchResults: PropTypes.array,
  tagInView: PropTypes.object,
  search: PropTypes.func,
  setSelectedTagFromSearch: PropTypes.func,
  setSearchTerm: PropTypes.func,
  searchTerm: PropTypes.string,
  linkedTags: PropTypes.array,
  searchLinkedTagDocument: PropTypes.func
};

LinkedTags.defaultProps = {
  listItems: []
};

export default LinkedTags;
