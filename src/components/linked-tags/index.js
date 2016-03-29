import React, { Component, PropTypes } from 'react';
import TagList from '../tag-list';

class LinkedTags extends Component {
  render () {
    const { listItems, containerClass } = this.props;
    return (
      <div className={containerClass}>
        <TagList listItems={listItems} />
      </div>
    );
  }
}

LinkedTags.propTypes = {
  listItems: PropTypes.array,
  containerClass: PropTypes.string
};

export default LinkedTags;
