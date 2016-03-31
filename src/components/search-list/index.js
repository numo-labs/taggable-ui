import React, { Component, PropTypes } from 'react';
import SearchBar from '../search-bar';
import TagList from '../tag-list';

class SearchList extends Component {
  render () {
    const {
      listItems,
      onSearchSubmit,
      onChangeText,
      handleTagClick,
      selectedTagId,
      searchTerm
    } = this.props;
    console.log(this.props);
    return (
      <div>
        <SearchBar
          handleSubmit={onSearchSubmit}
          onChangeText={onChangeText}
          searchTerm={searchTerm}
        />
        <TagList
          listItems={listItems}
          withButtons={false}
          handleTagClick={handleTagClick}
          selectedTagId={selectedTagId}
        />
      </div>
    );
  }
}

SearchList.propTypes = {
  onSearchSubmit: PropTypes.func,
  onChangeText: PropTypes.func,
  searchTerm: PropTypes.string,
  listItems: PropTypes.array,
  handleTagClick: PropTypes.func,
  selectedTagId: PropTypes.string
};

export default SearchList;
