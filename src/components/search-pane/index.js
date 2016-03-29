import React, { PropTypes, Component } from 'react';

import Tags from '../tag-list/';
import SearchBar from '../search-bar';

require('./styles.css');
class SearchPane extends Component {
  render () {
    const { listItems } = this.props;
    return (
      <div>
        <SearchBar />
        <Tags listItems={listItems}/>
      </div>
    );
  }
}

SearchPane.propTypes = {
  listItems: PropTypes.array
};

export default SearchPane;
