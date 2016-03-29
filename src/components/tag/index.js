import React, { Component, PropTypes } from 'react';

class Tag extends Component {
  render () {
    const { tagName } = this.props;
    return (
      <div>
        <p>{tagName}</p>
      </div>
    );
  }
}

Tag.propTypes = {
  tagName: PropTypes.string
};

export default Tag;
