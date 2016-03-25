import React, { Component, PropTypes } from 'react';

class Tag extends Component {
  render () {
    const { tagName } = this.props;
    return (
      <div>
        <h1>{tagName}</h1>
      </div>
    );
  }
}

Tag.propTypes = {
  tagName: PropTypes.string
};

export default Tag;
