import React, { PropTypes, Component } from 'react';

require('./styles.css');
class SearchBar extends Component {

  constructor () {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (e) {
    const { handleSubmit } = this.props;
    console.log('called twice', handleSubmit);
    e.preventDefault();
    handleSubmit !== undefined && handleSubmit();
  }

  render () {
    const { onChangeText } = this.props;
    return (
      <form className='search' onSubmit={this.handleSubmit}>
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
