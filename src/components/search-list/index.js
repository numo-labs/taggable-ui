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
      selectedTagIds,
      searchString,
      pagination,
      symbol,
      handleButtonClick,
      tagType,
      onFilterButtonClick,
      inSearch
    } = this.props;
    return (
      <div>
        <SearchBar
          onSubmit={onSubmit}
          onSearchStringChange={onSearchStringChange}
          searchString={searchString}
          tagType={tagType}
          onFilterButtonClick={onFilterButtonClick}
        />
        <TagList
          items={items}
          withButtons={false}
          onTagClick={onTagClick}
          selectedTagIds={selectedTagIds}
          pagination={pagination}
          symbol={symbol}
          handleButtonClick={handleButtonClick}
          inSearch={inSearch}
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
  selectedTagIds: PropTypes.array,
  onSearchStringChange: PropTypes.func,
  pagination: PropTypes.object,
  symbol: PropTypes.string,
  handleButtonClick: PropTypes.func,
  queryType: PropTypes.string,
  tagType: PropTypes.string,
  onFilterButtonClick: PropTypes.func,
  inSearch: PropTypes.bool
};

export default SearchList;
