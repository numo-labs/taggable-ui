import React, { PropTypes, Component } from 'react';

require('./styles.css');
class SearchBar extends Component {
  render () {
    const { handleSubmit, onChangeText } = this.props;
    return (
      <form className='search' onSubmit={handleSubmit}>
        <input
          type='search'
          className='search__input search__input--rounded'
          placeholder='Search by id or displayName..'
          onChange={onChangeText}
        />
      </form>
    );
  }
}

SearchBar.propTypes = {
  handleSubmit: PropTypes.func,
  onChangeText: PropTypes.func
};

export default SearchBar;
