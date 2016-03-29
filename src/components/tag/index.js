import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import './styles.css';

class Tag extends Component {
  render () {
    const { tagName, onHandleClick } = this.props;
    return (
      <Button className='tag'>
        <div onClick={onHandleClick}>
          <h3>{tagName}</h3>
        </div>
      </Button>
    );
  }
}

Tag.propTypes = {
  tagName: PropTypes.string,
  onHandleClick: PropTypes.func
};

export default Tag;
