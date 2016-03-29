import React, { Component, PropTypes } from 'react';
import LinkedTags from '../linked-tags';
import SearchBar from '../search';
import ViewPane from '../view-pane';

import './css/normalize.css';

class TaggableUI extends Component {
  render () {
    const { tags } = this.props;
    return (
      <div>
        <SearchBar />
        <LinkedTags listItems={tags} />
        <ViewPane />
      </div>
    );
  }
}

TaggableUI.propTypes = {
  tags: PropTypes.array
};

export default TaggableUI;
