import React, { Component } from 'react';

require('./styles.css');
class SearchBar extends Component {
  render () {
    return (
      <form className='search'>
        <span><input type='search' className='search__input search__input--rounded' placeholder='Search by id or displayName..' /></span>
      </form>
    );
  }
}

SearchBar.propTypes = {
};

export default SearchBar;
