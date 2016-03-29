import React, { PropTypes, Component } from 'react';

import Tags from '../tag-list/';
import SearchBar from '../search-bar';
import { AddTagButton as Button } from '../button';

require('./styles.css');
class SearchPane extends Component {
  render () {
    const { listItems } = this.props;
    return (
      <div>
        <SearchBar />
        <Tags listItems={listItems}/>
        <Button
          onClick={this.toggleSearchBarVisible}
          text='+ Create a new tag'
        />
      </div>
    );
  }
}

SearchPane.propTypes = {
  listItems: PropTypes.array
};

export default SearchPane;
