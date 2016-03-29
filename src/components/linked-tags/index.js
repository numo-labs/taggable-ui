import React, { Component, PropTypes } from 'react';
import TagList from '../tag-list';
import SearchBar from '../search-bar';
import CustomButton from '../button';
import { Button } from 'react-bootstrap';

require('./styles.css');
class LinkedTags extends Component {

  constructor () {
    super();
    this.state = {
      searchBarVisible: false
    };
    this.toggleSearchBarVisible = this.toggleSearchBarVisible.bind(this);
  }

  toggleSearchBarVisible () {
    this.setState({ searchBarVisible: !this.state.searchBarVisible });
  }
  render () {
    const {
      props: { listItems },
      state: { searchBarVisible }
     } = this;

    return (
      <div>
        <TagList listItems={listItems} withButtons={true}/>
        <Button className='tagList__button' onClick={this.toggleSearchBarVisible} bsStyle='success'>+ Add a new tag</Button>
        { searchBarVisible ? <SearchBar /> : <div />}
      </div>
    );
  }
}

LinkedTags.propTypes = {
  listItems: PropTypes.array
};

export default LinkedTags;
