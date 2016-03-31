import React, { Component, PropTypes } from 'react';
import Tag from '../tag';
import { SymbolButton as Button } from '../button';
import './styles.css';

class TagList extends Component {
  render () {
    const {
      listItems,
      handleButtonClick,
      handleTagClick,
      withButtons,
      selectedTagId
    } = this.props;
    const list = listItems.map(item => {
      return (
        <div key={item._id} className='tag__item'>
          <Tag key={item._id} id={item._id} tagName={item.displayName} selected={item._id === selectedTagId} onClick={handleTagClick} />
           { withButtons && <Button className='redButton' onHandleClick={handleButtonClick} symbol={'x'} /> }
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
  handleButtonClick: PropTypes.func,
  handleTagClick: PropTypes.func,
  withButtons: PropTypes.bool,
  selectedTagId: PropTypes.string
};

TagList.defaultProps = {
  withButtons: true,
  listItems: []
};

export default TagList;
