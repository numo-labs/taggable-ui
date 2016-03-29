import React, { Component, PropTypes } from 'react';
import LinkedTags from '../linked-tags';
import SearchPane from '../search-pane';
import { Col } from 'react-bootstrap';
require('./styles.css');
import './css/normalize.css';
class TaggableUI extends Component {
  render () {
    const { tags } = this.props;
    return (
      <div className='ui'>
        <Col xs={4} md={4}>
          <SearchPane listItems={tags}/>
        </Col>
        <Col xs={4} md={4}>
          <LinkedTags listItems={tags}/>
        </Col>
        <Col xs={4} md={4}>
          <LinkedTags listItems={tags}/>
        </Col>
      </div>
    );
  }
}

TaggableUI.propTypes = {
  tags: PropTypes.array
};

export default TaggableUI;
