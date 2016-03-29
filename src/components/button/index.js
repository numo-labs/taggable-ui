import React, { Component, PropTypes } from 'react';
import './styles.css';

class Button extends Component {
  render () {
    const { symbol, onHandleClick } = this.props;
    return (
      <div className='button' onClick={onHandleClick}>
        <div>{symbol}</div>
      </div>
    );
  }
}

Button.propTypes = {
  symbol: PropTypes.string,
  onHandleClick: PropTypes.func
};

export default Button;
