import React, { Component, PropTypes } from 'react';
import LinkedTags from '../linked-tags';
import SearchPane from '../search-pane';

require('./styles.css');
class TaggableUI extends Component {
  render () {
    const { tags } = this.props;
    return (
      <div className='ui'>
        <SearchPane listItems={tags} containerClass='ui__left_pane'/>
        <LinkedTags listItems={tags} containerClass='ui__centre_pane'/>
        <LinkedTags listItems={tags} containerClass='ui__right_pane'/>
      </div>
    );
  }
}

TaggableUI.propTypes = {
  tags: PropTypes.array
};

export default TaggableUI;
