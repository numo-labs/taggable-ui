import React, { PropTypes, Component } from 'react';

import Tags from '../tag-list/';
import SearchBar from '../search-bar';
import { AddTagButton as Button } from '../button';
import Modal from '../create-tag-modal';

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
    const { props: { listItems }, state: { modalVisible } } = this;
    return (
      <div>
        <SearchBar />
        <Tags listItems={listItems}/>
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
  listItems: PropTypes.array
};

export default SearchPane;
