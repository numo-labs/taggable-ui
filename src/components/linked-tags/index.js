import React, { Component, PropTypes } from 'react';
import TagList from '../tag-list';
import SearchBar from '../search-bar';
import { AddTagButton as Button } from '../button';

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
      props: { listItems, onTagClick, selectedTagId },
      state: { searchBarVisible }
     } = this;

    return (
      <div>
        <TagList
          listItems={listItems}
          handleTagClick={onTagClick}
          selectedTagId={selectedTagId}
        />
        {
          listItems.length > 0 &&
          <Button
          onClick={this.toggleSearchBarVisible}
          text='+ Add a new tag'
          />
        }
        { searchBarVisible && <SearchBar /> }
      </div>
    );
  }
}

LinkedTags.propTypes = {
  listItems: PropTypes.array,
  onTagClick: PropTypes.func,
  selectedTagId: PropTypes.string
};

export default LinkedTags;
