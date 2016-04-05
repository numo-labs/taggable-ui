import React, { Component, PropTypes } from 'react';
import Tag from '../tag';
import { SymbolButton as Button } from '../button';
import './styles.css';

class LinkedTagsList extends Component {
  render () {
    const {
      items,
      handleButtonClick,
      handleTagClick,
      withButtons,
      selectedTagId
    } = this.props;
    const list = items.map(item => {
      return (
        <div key={item.id} className='tag__item'>
          <Tag key={item.id} id={item.id} tagName={item.displayName} selected={item.id === selectedTagId} onClick={handleTagClick} />
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

LinkedTagsList.propTypes = {
  items: PropTypes.array,
  handleButtonClick: PropTypes.func,
  handleTagClick: PropTypes.func,
  withButtons: PropTypes.bool,
  selectedTagId: PropTypes.string
};

LinkedTagsList.defaultProps = {
  withButtons: true,
  listItems: []
};

export default LinkedTagsList;
