import React, { PropTypes, Component } from 'react';

import Tags from '../tag-list/';
import SearchBar from '../search-bar';
import { Button } from 'react-bootstrap';

require('./styles.css');
class SearchPane extends Component {
  render () {
    const { listItems } = this.props;
    return (
      <div>
        <SearchBar />
        <Tags listItems={listItems}/>
        <Button
          className='tagList__button'
          bsStyle='success'
        >
          + Create new tag
        </Button>
      </div>
    );
  }
}

SearchPane.propTypes = {
  listItems: PropTypes.array
};

export default SearchPane;
