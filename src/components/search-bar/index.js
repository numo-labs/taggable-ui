/*
* Search Bar component which takes two functions as props:
* - onChangeText to capture the input text
* - handleSubmit which is called when the return key is pressed on the form
*/

import React, { PropTypes, Component } from 'react';
import { Input, Button } from 'react-bootstrap';
import FilterButtons from '../filter-buttons';

require('./styles.css');
class SearchBar extends Component {

  constructor (props) {
    super(props);
    this.state = {
      text: props.searchString || ''
    };
  }

  handleOnKeyUp (event) {
    const { queryType, tagType } = this.props;
    if (event.key === 'Enter') {
      this.props.onSubmit(this.refs.input.getValue(), queryType, tagType);
    }
  }

  handleOnChange () {
    this.setState({
      text: this.refs.input.getValue()
    });
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.searchString && nextProps.searchString !== this.state.text) {
      this.setState({
        text: nextProps.searchString
      });
    }
  }

  handleOnButtonClick () {
    const { queryType, tagType } = this.props;
    console.log('*********', this.props);
    this.props.onSubmit(this.refs.input.getValue(), queryType, tagType);
  }

  render () {
    const { queryType, tagType, onFilterButtonClick } = this.props;
    const searchButton = <Button onClick={this.handleOnButtonClick.bind(this)} bsStyle={'success'}>Search</Button>;
    return (
    <div>
      <FilterButtons
        queryType={queryType}
        tagType={tagType}
        onFilterButtonClick={onFilterButtonClick}
      />
      <Input
        ref='input'
        type='search'
        className='search__input'
        placeholder='Search by id or displayName..'
        onKeyUp={this.handleOnKeyUp.bind(this)}
        buttonAfter={searchButton}
        value={this.state.text}
        onChange={this.handleOnChange.bind(this)}
      />
    </div>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
  onTextInputChange: PropTypes.func,
  searchString: PropTypes.string,
  onSearchStringChange: PropTypes.func,
  tagType: PropTypes.string,
  queryType: PropTypes.string,
  onFilterButtonClick: PropTypes.func
};

export default SearchBar;
