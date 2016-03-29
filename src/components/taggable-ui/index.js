import React, { Component, PropTypes } from 'react';
import LinkedTags from '../linked-tags';
import ViewPane from '../view-pane';
import SearchPane from '../search-pane';
import { Col, PageHeader, Row, Grid } from 'react-bootstrap';
const metadata = [
  {
    key: 'meta:location',
    values: ['13.1777', '-59.63560']
  },
  {
    key: 'search:en',
    values: ['All Seasons Resort Europe']
  },
  {
    key: 'search:fr',
    values: ['All Seasons Resort en Europe', 'All Seasons Resort Europe'] // Can search for both when in language FR context
  },
  {
    key: 'label:en',
    values: ['All Seasons Resort Europa']
  }
];
require('./styles.css');
import './css/normalize.css';

class TaggableUI extends Component {
  render () {
    const { tags } = this.props;
    return (
      <Grid fluid={true}>
        <PageHeader>Numo Labs Tag System</PageHeader>
        <Row>
          <Col xs={3} md={3} className='col-centered'>
            <SearchPane listItems={tags}/>
          </Col>
          <Col xs={3} md={3} className='col-centered'>
            <LinkedTags listItems={tags}/>
          </Col>
          <Col xs={6} md={6} className='col-centered'>
            <ViewPane metadata={metadata}listItems={tags}/>
          </Col>
        </Row>
      </Grid>
    );
  }
}

TaggableUI.propTypes = {
  tags: PropTypes.array
};

export default TaggableUI;
