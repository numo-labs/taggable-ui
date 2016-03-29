/*
* Search Bar component which takes two functions as props:
* - onChangeText to capture the input text
* - handleSubmit which is called when the return key is pressed on the form
*/

import React, { PropTypes, Component } from 'react';

import { Input } from 'react-bootstrap';

require('./styles.css');
class SearchBar extends Component {

  constructor () {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (e) {
    const { handleSubmit } = this.props;
    e.preventDefault();
    handleSubmit !== undefined && handleSubmit();
  }

  render () {
    const { onChangeText } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          type='search'
          className='search__input'
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
