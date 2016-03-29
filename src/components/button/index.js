import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import './styles.css';
class CustomButton extends Component {
  render () {
    const { symbol, onHandleClick } = this.props;
    return (
      <Button className='button'>
        <div onClick={onHandleClick}>
          <div>{symbol}</div>
        </div>
      </Button>
    );
  }
}

CustomButton.propTypes = {
  symbol: PropTypes.string,
  onHandleClick: PropTypes.func
};

export default CustomButton;
