import React, { Component, PropTypes } from 'react';

class Tag extends Component {
  render () {
    const { tagName, onHandleClick } = this.props;
    return (
      <div onClick={onHandleClick}>
        <h1>{tagName}</h1>
      </div>
    );
  }
}

Tag.propTypes = {
  tagName: PropTypes.string,
  onHandleClick: PropTypes.func
};

export default Tag;
