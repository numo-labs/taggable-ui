import React, { PropTypes, Component } from 'react';

import TagList from '../tag-list/';
import SearchBar from '../search-bar';
import { AddTagButton as Button } from '../button';
import Modal from '../create-tag-modal';
import SearchList from '../search-list';

require('./styles.css');
class SearchPane extends Component {

  constructor () {
    super();
    this.state = {
      modalVisible: false
    };
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  showModal () {
    this.setState({modalVisible: true});
  }

  closeModal () {
    this.setState({modalVisible: false});
  }

  saveChanges () {
    console.log('changes need to be saved!!!');
  }

  render () {
    const {
      props: {
        listItems,
        onSearchSubmit,
        setSearchTerm,
        onTagClick,
        selectedTagId,
        searchTerm
      },
      state: { modalVisible }
    } = this;
    console.log(setSearchTerm);

    return (
      <div>
        <SearchList
          handleSubmit={onSearchSubmit}
          onChangeText={setSearchTerm}
          searchTerm={searchTerm}
          listItems={listItems}
          withButtons={false}
          handleTagClick={onTagClick}
          selectedTagId={selectedTagId}
        />
        <Button
          onClick={this.showModal}
          text='+ Create a new tag'
        />
        <Modal modalVisible={modalVisible} closeModal={this.closeModal} saveChanges={this.saveChanges}/>
      </div>
    );
  }
}

SearchPane.propTypes = {
  listItems: PropTypes.array,
  onSearchSubmit: PropTypes.func,
  setSearchTerm: PropTypes.func,
  onTagClick: PropTypes.func,
  selectedTagId: PropTypes.string,
  searchTerm: PropTypes.string
};

export default SearchPane;
