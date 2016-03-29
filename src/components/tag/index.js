import React, { Component, PropTypes } from 'react';
import './styles.css';

class Tag extends Component {
  render () {
    const { tagName, onHandleClick } = this.props;
    return (
      <div className='tag' onClick={onHandleClick}>
        <h3>{tagName}</h3>
      </div>
    );
  }
}

Tag.propTypes = {
  tagName: PropTypes.string,
  onHandleClick: PropTypes.func
};

export default Tag;
