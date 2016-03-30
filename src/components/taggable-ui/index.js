import React, { Component, PropTypes } from 'react';
import LinkedTags from '../linked-tags';
import ViewPane from '../view-pane';
import SearchPane from '../search-pane';
import { Col, PageHeader, Row, Grid } from 'react-bootstrap';

require('./styles.css');
import './css/normalize.css';

class TaggableUI extends Component {
  render () {
    const {
      searchResults,
      tagInView: { metadata, _id, displayName },
      linkedTags,
      search,
      setTagInView,
      setSelectedTagFromSearch,
      setSearchTerm,
      selectedTagFromSearch
    } = this.props;
    return (
      <Grid fluid>
        <PageHeader>Numo Labs Tag System</PageHeader>
        <Row>
          <Col xs={3} md={3} className='col-centered'>
            <SearchPane
              onSearchSubmit={search}
              setSearchTerm={setSearchTerm}
              onTagClick={setSelectedTagFromSearch}
              listItems={searchResults}
              selectedTagId={selectedTagFromSearch._id}
            />
          </Col>
          <Col xs={3} md={3} className='col-centered'>
            <LinkedTags
              onTagClick={setTagInView}
              listItems={linkedTags}
              selectedTagId={_id}
            />
          </Col>
          <Col xs={6} md={6} className='col-centered'>
            <ViewPane
              id={_id}
              displayName={displayName}
              metadata={metadata}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

TaggableUI.propTypes = {
  searchResults: PropTypes.array,
  selectedTag: PropTypes.object,
  tagInView: PropTypes.object,
  linkedTags: PropTypes.array,
  search: PropTypes.func,
  setTagInView: PropTypes.func,
  setSelectedTagFromSearch: PropTypes.func,
  setSearchTerm: PropTypes.func,
  selectedTagFromSearch: PropTypes.object
};

export default TaggableUI;
