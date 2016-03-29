import React, { Component, PropTypes } from 'react';
import Tag from '../tag';
import Button from '../button';

class TagList extends Component {
  render () {
    const { listItems, onHandleButtonClick, onHandleTagClick } = this.props;
    const list = listItems.map(listItem => {
      return (
        <div className='listItem'>
          <Tag key={listItem.tagId} tagName={listItem.tagId} onHandleClick={onHandleTagClick} />
          <Button onHandleClick={onHandleButtonClick} symbol={'-'} />
        </div>
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
  listItems: PropTypes.array,
  onHandleButtonClick: PropTypes.func,
  onHandleTagClick: PropTypes.func
};

export default TagList;
