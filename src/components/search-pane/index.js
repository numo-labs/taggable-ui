import React, { PropTypes, Component } from 'react';

import Tags from '../tag-list/';
import SearchBar from '../search-bar';

require('./styles.css');
class SearchPane extends Component {
  render () {
    const { listItems, containerClass } = this.props;
    return (
      <div className={containerClass}>
        <SearchBar />
        <Tags listItems={listItems}/>
      </div>
    );
  }
}

SearchPane.PropTypes = {
  listItems: PropTypes.array,
  containerClass: PropTypes.string
};

export default SearchPane;
