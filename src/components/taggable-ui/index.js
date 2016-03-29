import React, { Component, PropTypes } from 'react';
import LinkedTags from '../linked-tags';
import SearchPane from '../search-pane';
import { Col, PageHeader, Row, Grid } from 'react-bootstrap';
require('./styles.css');
import './css/normalize.css';
class TaggableUI extends Component {
  render () {
    const { tags } = this.props;
    return (
      <Grid fluid={true}>
        <PageHeader>Numo Labs Tag System</PageHeader>
        <Row>
          <Col xs={4} md={4} className='col-centered'>
            <SearchPane listItems={tags}/>
          </Col>
          <Col xs={4} md={4} className='col-centered'>
            <LinkedTags listItems={tags}/>
          </Col>
          <Col xs={4} md={4} className='col-centered'>
            <LinkedTags listItems={tags}/>
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
