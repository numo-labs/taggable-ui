import React, { Component, PropTypes } from 'react';
import Tag from '../tag';
import { SymbolButton as Button } from '../button';
import './styles.css';

class TagList extends Component {
  render () {
    const { listItems, onHandleButtonClick, onHandleTagClick, withButtons } = this.props;
    const list = listItems.map(listItem => {
      return (
        <div key={listItem.tagId}>
          <Tag key={listItem.tagId} className='listItem' tagName={listItem.tagId} onHandleClick={onHandleTagClick} />
           { withButtons && <Button className='redButton' onHandleClick={onHandleButtonClick} symbol={'-'} /> }
        </div>
      );
    });
    return (
      <div className='list'>
        {list}
      </div>
    );
  }
}

TagList.propTypes = {
  listItems: PropTypes.array,
  onHandleButtonClick: PropTypes.func,
  onHandleTagClick: PropTypes.func,
  withButtons: PropTypes.bool
};

export default TagList;
