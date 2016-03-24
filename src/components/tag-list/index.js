import React, { Component, PropTypes } from 'react';
import Tag from '../tag';

class TagList extends Component {
  render () {
    const { listItems } = this.props;
    const list = listItems.map(listItem => {
      return (
        <Tag tagName={listItem.tagId} />
      );
    });
    return (
      <ul>
        {list}
      </ul>
    );
  }
}

TagList.propTypes = {
  listItems: PropTypes.array
};

export default TagList;
