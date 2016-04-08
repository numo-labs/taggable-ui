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
      pagination,
      symbol,
      handleButtonClick,
      queryType,
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
          queryType={queryType}
          tagType={tagType}
          onFilterButtonClick={onFilterButtonClick}
        />
        <TagList
          items={items}
          withButtons={false}
          onTagClick={onTagClick}
          selectedTagId={selectedTagId}
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
  selectedTagId: PropTypes.string,
  onSearchStringChange: PropTypes.func,
  pagination: PropTypes.object,
  symbol: PropTypes.bool,
  handleButtonClick: PropTypes.func,
  queryType: PropTypes.string,
  tagType: PropTypes.string,
  onFilterButtonClick: PropTypes.func,
  inSearch: PropTypes.bool
};

export default SearchList;
