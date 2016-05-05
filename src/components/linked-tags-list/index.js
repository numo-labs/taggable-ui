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
        <div key={item.node} className='tag__item'>
          <Tag
            key={item.node}
            id={item.node}
            displayName={item.displayName}
            selected={item.node === selectedTagId}
            onClick={() => handleTagClick(item.node)}
            active={item.active}
          />
          <Button
            className='redButton'
            onHandleClick={() => handleButtonClick(item.node)}
            symbol={symbol}
          />
        </div>
      );
    });
    return (
      <div className='linked_list'>
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
