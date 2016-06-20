import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import './styles.css';

export class SymbolButton extends Component {
  render () {
    const { symbol, onHandleClick } = this.props;
    const buttonColour = symbol === '+' ? 'success' : 'danger';
    return (
      <Button
        onClick={onHandleClick}
        className='button'
        bsStyle={buttonColour}
        bsSize='small'>
        <div>{symbol}</div
      >
      </Button>
    );
  }
}

export class AddTagButton extends Component {
  render () {
    const { text, onClick, disabled } = this.props;
    return (
      <Button
        className='tagList__button'
        bsStyle='success'
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </Button>
    );
  }
}

SymbolButton.propTypes = {
  symbol: PropTypes.string,
  onHandleClick: PropTypes.func
};

AddTagButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};
