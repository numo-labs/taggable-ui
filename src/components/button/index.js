import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import './styles.css';

class CustomButton extends Component {
  render () {
    const { symbol, onHandleClick } = this.props;
    const buttonColour = symbol === '+' ? 'success' : 'danger';
    return (
      <Button onClick={onHandleClick} className='button' bsStyle={buttonColour} bsSize='small'>
        <div>{symbol}</div>
      </Button>
    );
  }
}

CustomButton.propTypes = {
  symbol: PropTypes.string,
  onHandleClick: PropTypes.func
};

export default CustomButton;
