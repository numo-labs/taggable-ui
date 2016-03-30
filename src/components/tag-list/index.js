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
      withButtons
    } = this.props;
    const list = listItems.map(item => {
      return (
        <div key={item._id}>
          <Tag key={item._id} id={item._id} tagName={item.displayName} onClick={handleTagClick} />
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
  withButtons: PropTypes.bool
};

TagList.defaultProps = {
  withButtons: true,
  listItems: []
};

export default TagList;
