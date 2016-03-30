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
      setSearchTerm
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
            <SearchPane
              onSearchSubmit={search}
              setSearchTerm={setSearchTerm}
              onTagClick={setSelectedTagFromSearch}
              listItems={searchResults}
            />
          </Col>
          <Col xs={3} md={3} className='col-centered'>
            <LinkedTags
              onTagClick={setTagInView}
              listItems={linkedTags}
            />
          </Col>
          <Col xs={6} md={6} className='col-centered'>
            <ViewPane height={'30vh'} id={_id} displayName={displayName} metadata={metadata}/>
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
  setSearchTerm: PropTypes.func
};

export default TaggableUI;
