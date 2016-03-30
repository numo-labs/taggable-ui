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
          <Tag key={listItem.tagId} tagName={listItem.tagId} onHandleClick={onHandleTagClick} />
           { withButtons && <Button onHandleClick={onHandleButtonClick} symbol={'-'} /> }
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

TagList.defaultProps = {
  withButtons: true
};

export default TagList;
