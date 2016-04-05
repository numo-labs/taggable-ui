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
       items,
       onTagClick,
       selectedTagId,
       searchResults,
       search,
       setSelectedTagFromSearch,
       setSearchTerm,
       searchTerm,
       onClickTag
    } = this.props;
    const { manageTagsModalVisible } = this.state;
    return (
      <div>
        <TagList
          items={items}
          onTagClick={onTagClick}
          selectedTagId={selectedTagId}
        />
          <Button
          onClick={this.showModal}
          text='* Modify linked tags'
          />
        <Modal
          items={items}
          modalVisible={manageTagsModalVisible}
          closeModal={this.closeModal}
          saveChanges={this.saveChanges}
          onSearchSubmit={search}
          setSearchTerm={setSearchTerm}
          onTagClick={setSelectedTagFromSearch}
          searchResults={searchResults}
          searchTerm={searchTerm}
          onClickTag={onClickTag}
        />
      </div>
    );
  }
}

LinkedTags.propTypes = {
  items: PropTypes.array,
  onTagClick: PropTypes.func,
  onClickTag: PropTypes.func,
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
  items: []
};

export default LinkedTags;
