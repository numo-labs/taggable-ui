import React, { Component, PropTypes } from 'react';
import SearchBar from '../search-bar';
import TagList from '../tag-list';

class SearchList extends Component {
  render () {
    const {
      items,
      onSubmit,
      onSearchStringChange,
      onTagClick,
      selectedTagId,
      searchString,
      pagination
    } = this.props;
    return (
      <div>
        <SearchBar
          onSubmit={onSubmit}
          onSearchStringChange={onSearchStringChange}
          searchString={searchString}
        />
        <TagList
          items={items}
          withButtons={false}
          onTagClick={onTagClick}
          selectedTagId={selectedTagId}
          pagination={pagination}
        />
      </div>
    );
  }
}

SearchList.propTypes = {
  onSubmit: PropTypes.func,
  onChangeText: PropTypes.func,
  searchString: PropTypes.string,
  items: PropTypes.array,
  onTagClick: PropTypes.func,
  selectedTagId: PropTypes.string,
  onSearchStringChange: PropTypes.func,
  pagination: PropTypes.object
};

export default SearchList;
