import React, { Component, PropTypes } from 'react';
import LinkedTags from '../linked-tags';
import SearchBar from '../search';

import './css/normalize.css';

class TaggableUI extends Component {
  render () {
    const { tags } = this.props;
    return (
      <div>
        <SearchBar />
        <LinkedTags listItems={tags} />
      </div>
    );
  }
}

TaggableUI.propTypes = {
  tags: PropTypes.array
};

export default TaggableUI;
