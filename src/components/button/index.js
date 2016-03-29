import React, { Component, PropTypes } from 'react';

class Button extends Component {
  render () {
    const { symbol, onHandleClick } = this.props;
    return (
      <div onClick={onHandleClick}>
        <h1>{symbol}</h1>
      </div>
    );
  }
}

Button.propTypes = {
  symbol: PropTypes.string,
  onHandleClick: PropTypes.func
};

export default Button;
