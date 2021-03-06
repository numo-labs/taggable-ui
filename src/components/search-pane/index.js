import React, { PropTypes, Component } from 'react';

import SearchList from '../search-list';

require('./styles.css');
class SearchPane extends Component {

  constructor () {
    super();
    this.state = {
      modalVisible: false,
      activePage: 1
    };
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  showModal () {
    this.setState({modalVisible: true});
  }

  closeModal () {
    this.setState({modalVisible: false});
  }

  saveChanges () {
    console.log('changes need to be saved!!!');
  }

  render () {
    const {
      props: {
        items,
        onSearchStringChange,
        onTagClick,
        selectedTagIds,
        searchString,
        pagination,
        onSubmit,
        onFilterButtonClick,
        inSearch,
        cleanSearchPane,
        tagType
      }
    } = this;
    return (
      <div>
        <SearchList
          onSearchStringChange={onSearchStringChange}
          onSubmit={onSubmit}
          searchString={searchString}
          items={items}
          withButtons={false}
          onTagClick={onTagClick}
          selectedTagIds={selectedTagIds}
          pagination={pagination}
          onFilterButtonClick={onFilterButtonClick}
          inSearch={inSearch}
          cleanSearchPane={cleanSearchPane}
          tagType={tagType}
        />
      </div>
    );
  }
}

SearchPane.propTypes = {
  items: PropTypes.array,
  onSubmit: PropTypes.func,
  setSearchTerm: PropTypes.func,
  onTagClick: PropTypes.func,
  selectedTagIds: PropTypes.array,
  searchString: PropTypes.string,
  onSearchStringChange: PropTypes.func,
  pagination: PropTypes.object,
  queryType: PropTypes.string,
  tagType: PropTypes.string,
  onFilterButtonClick: PropTypes.func,
  cleanSearchPane: PropTypes.func,
  inSearch: PropTypes.bool
};

export default SearchPane;
