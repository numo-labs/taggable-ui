import React, { Component, PropTypes } from 'react';
import LinkedTag from '../linked-tag';
import { SymbolButton as Button } from '../button';
import './styles.css';

class LinkedTagsList extends Component {
  render () {
    const {
      items,
      handleButtonClick,
      handleTagClick,
      symbol,
      selectedTagId,
      withButtons
    } = this.props;
    const list = items.map(item => {
      const {
        node: { properties: { id, name } },
        relationship: { properties: { active }, type }
      } = item;
      return (
        <div key={id} className='tag__item'>
          <LinkedTag
            key={id}
            id={id}
            displayName={name}
            relationType={type}
            selected={id === selectedTagId}
            onClick={() => handleTagClick(name)}
            active={active}
          />
          { withButtons &&
            <Button
              className='redButton'
              onHandleClick={() => handleButtonClick(id)}
              symbol={symbol}
            />
          }
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
