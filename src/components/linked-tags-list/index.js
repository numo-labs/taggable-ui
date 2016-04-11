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
      symbol,
      selectedTagId
    } = this.props;
    const list = items.map(item => {
      return (
        <div key={item.id} className='tag__item'>
          <Tag
           key={item.id}
           id={item.id}
           tagName={item.displayName}
           selected={item.id === selectedTagId}
           onClick={handleTagClick}
          />
          <Button
            className='redButton'
            onHandleClick={() => handleButtonClick(item.id)}
            symbol={symbol}
          />
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
  selectedTagId: PropTypes.string,
  symbol: PropTypes.string
};

LinkedTagsList.defaultProps = {
  withButtons: true,
  listItems: []
};

export default LinkedTagsList;
