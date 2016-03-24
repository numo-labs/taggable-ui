import React, { Component, PropTypes } from 'react';
import Tag from '../tag';

class TagList extends Component {
  render () {
    const { listItems } = this.props;
    console.log(listItems);
    const list = listItems.map(listItem => {
      return (
        <Tag key={listItem.tagId} tagName={listItem.tagId} />
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
