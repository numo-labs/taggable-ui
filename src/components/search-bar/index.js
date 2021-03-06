/*
* Search Bar component which takes two functions as props:
* - onChangeText to capture the input text
* - handleSubmit which is called when the return key is pressed on the form
*/

import React, { PropTypes, Component } from 'react';
import { Input, Button } from 'react-bootstrap';

require('./styles.css');
class SearchBar extends Component {

  constructor (props) {
    super(props);
    this.state = {
      text: props.searchString || ''
    };
  }

  onKeyUp (event) {
    if (event.key === 'Enter') {
      this.props.onSubmit(this.refs.input.getValue());
    }
  }

  handleOnChange () {
    console.log('val', this.refs.input.getValue());
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

  render () {
    const searchButton = <Button onClick={() => this.props.onSubmit(this.refs.input.getValue())} bsStyle={'success'}>Search</Button>;
    return (
    <div>
      <Input
        ref='input'
        type='search'
        className='search__input'
        placeholder='Search by id or displayName..'
        onKeyUp={this.onKeyUp.bind(this)}
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
