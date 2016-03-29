import React, { Component, PropTypes } from 'react';
import TagList from '../tag-list';
import SearchBar from '../search';

class LinkedTags extends Component {
  render () {
    const { listItems } = this.props;
    return (
      <div>
        <TagList listItems={listItems} />
        <SearchBar />
      </div>
    );
  }
}

LinkedTags.propTypes = {
  listItems: PropTypes.array
};

export default LinkedTags;
