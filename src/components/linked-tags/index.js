import React, { Component, PropTypes } from 'react';
import TagList from '../tag-list';

class LinkedTags extends Component {
  render () {
    const { listItems } = this.props;
    return (
      <div>
        <TagList listItems={listItems} />
      </div>
    );
  }
}

LinkedTags.propTypes = {
  listItems: PropTypes.array
};

export default LinkedTags;
