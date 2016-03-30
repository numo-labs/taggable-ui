import React, { Component, PropTypes } from 'react';
import LinkedTags from '../linked-tags';
import ViewPane from '../view-pane';
import SearchPane from '../search-pane';
import { Col, Nav, NavItem, Navbar, Row, Grid } from 'react-bootstrap';
import { AddTagButton as Button } from '../button';

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
    <div>
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Nav>
              <h2>Numo Labs Tag System</h2>
            </Nav>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem><Button text={'Save new configuration'} /></NavItem>
        </Nav>
      </Navbar>
        <Grid fluid>
        <Row>
          <Col xs={3} md={3} className='col-centered'>
          <h1 className='title'>Search Tags</h1>
            <SearchPane
              onSearchSubmit={search}
              setSearchTerm={setSearchTerm}
              onTagClick={setSelectedTagFromSearch}
              listItems={searchResults}
              selectedTagId={selectedTagFromSearch._id}
            />
          </Col>
          <Col xs={3} md={3} className='col-centered'>
          <h1 className='title'>Linked Tags</h1>
            <LinkedTags
              onTagClick={setTagInView}
              listItems={linkedTags}
              selectedTagId={_id}
            />
          </Col>
          <Col xs={6} md={6} className='col-centered'>
          <h1 className='title'>Tag Content</h1>
            <ViewPane height={'35vh'} id={_id} displayName={displayName} metadata={metadata}/>
          </Col>
        </Row>
      </Grid>
    </div>
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
