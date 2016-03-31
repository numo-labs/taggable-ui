import React, { Component, PropTypes } from 'react';
import LinkedTags from '../linked-tags';
import ViewPane from '../view-pane';
import SearchPane from '../search-pane';
import { Col, Nav, NavItem, Navbar, Row, Grid } from 'react-bootstrap';
import { AddTagButton as Button } from '../button';

require('./styles.css');
import './css/normalize.css';

class TaggableUI extends Component {
  renderNavbar () {
    const navbar = (
      <nav className='navbar navbar-default navi'>
        <div className='navbar-header'>
          <Navbar.Brand>
            <Nav>
              <h2 className='numoTitle'>Numo Labs Tag System</h2>
            </Nav>
          </Navbar.Brand>
        </div>
        <Nav className='saveButton' pullRight>
          <NavItem><Button text={'Save new configuration'} /></NavItem>
        </Nav>
      </nav>
    );
    return navbar;
  }
  renderSearchPane () {
    const {
      searchResults,
      search,
      setSelectedTagFromSearch,
      setSearchTerm,
      selectedTagFromSearch
    } = this.props;
    const searchPane = (
      <Col xs={3} md={3} className='col-centered'>
        <h1 className='searchTagTitle'>Search Tags</h1>
        <SearchPane
          onSearchSubmit={search}
          setSearchTerm={setSearchTerm}
          onTagClick={setSelectedTagFromSearch}
          listItems={searchResults}
          selectedTagId={selectedTagFromSearch._id}
        />
      </Col>
    );
    return searchPane;
  }
  renderLinkedTags () {
    const {
      tagInView: { _id },
      linkedTags,
      setTagInView
    } = this.props;
    const tagLinks = (
      <Col xs={3} md={3} className='col-centered'>
        <h1 className='linkedTitle title'>Linked Tags</h1>
        <LinkedTags
          onTagClick={setTagInView}
          listItems={linkedTags}
          selectedTagId={_id}
        />
      </Col>
    );
    return tagLinks;
  }
  renderTagContent () {
    const {
      tagInView: { metadata, _id, displayName }
    } = this.props;
    const tagContent = (
      <Col xs={6} md={6} className='col-centered'>
        <h1 className='tagContentTitle'>Tag Content</h1>
        <ViewPane height={'38vh'} id={_id} displayName={displayName} metadata={metadata}/>
      </Col>
    );
    return tagContent;
  }
  render () {
    return (
      <div>
        {this.renderNavbar()}
        <Grid fluid>
          <Row>
            {this.renderSearchPane()}
            {this.renderTagContent()}
            {this.renderLinkedTags()}
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
