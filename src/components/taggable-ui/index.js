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
  onSearchStringChange (text) {
    this.props.setSearchString(text);
  }
  handleOnSubmit (text) {
    this.props.setSearchString(text);
    this.props.fetchTags(text, 0, 10);
  }
  handlePagination (index) {
    const start = index * 10;
    this.props.fetchTags(this.props.searchString, start, 10);
  }

  renderSearchPane () {
    const {
      searchResults,
      setSelectedTagFromSearch,
      searchString,
      tagInView
    } = this.props;
    const searchPane = (
      <Col xs={3} md={3} className='col-centered'>
        <h1 className='searchTagTitle'>Search Tags</h1>
        <SearchPane
          onSearchStringChange={this.onSearchStringChange.bind(this)}
          onTagClick={setSelectedTagFromSearch}
          items={searchResults.items.map(result => {
            return {
              id: result._id,
              displayName: result.displayName
            };
          })}
          selectedTagId={tagInView}
          searchString={searchString}
          pagination={{
            numberOfItems: Math.ceil(searchResults.total / 10),
            maxButtons: 3,
            onSelect: this.handlePagination.bind(this),
            total: searchResults.total
          }}
          onSubmit={this.handleOnSubmit.bind(this)}
        />
      </Col>
    );
    return searchPane;
  }
  renderLinkedTagList (tags) {
    if (tags) {
      return tags.map(result => {
        return {
          id: result.tagId
        };
      });
    } else {
      return [];
    }
  }
  renderLinkedTags () {
    const {
      searchResults,
      search,
      searchString,
      tagInView
    } = this.props;
    const tagLinks = (
      <Col xs={3} md={3} className='col-centered'>
        <h1 className='linkedTitle title'>Linked Tags</h1>
        <LinkedTags
          items={this.renderLinkedTagList(tagInView.tags)}
          onSearchSubmit={search}
          onTagClick={this.handleOnSubmit.bind(this)}
          searchResults={searchResults}
          selectedTagId={tagInView}
          searchString={searchString}
        />
      </Col>
    );
    return tagLinks;
  }

  renderTagContent () {
    const { tagInView } = this.props;

    const tagContent = (
      <Col xs={6} md={6} className='col-centered'>
        <h1 className='tagContentTitle'>Tag Content</h1>
        <ViewPane
          height={'35vh'}
          item={tagInView}
          items={this.renderLinkedTagList(tagInView.tags)}
        />
      </Col>
    );
    return tagContent;
  }

  renderItemContent () {
    const { tagInView } = this.props;
    if (tagInView.metadata) {
      return (
        <div>
          {this.renderTagContent()}
          {this.renderLinkedTags()}
        </div>
      );
    } else {
      return (
        <h1 className='well problems'>IF YOU'RE HAVING TAG PROBLEMS I FEEL BAD FOR YOU SON <br />
        I'VE GOT 99 PROBLEMS BUT A LINK AIN'T 1</h1>
      );
    }
  }

  render () {
    return (
      <div>
        {this.renderNavbar()}
        <Grid fluid>
          <Row>
            {this.renderSearchPane()}
            {this.renderItemContent()}
          </Row>
        </Grid>
      </div>
    );
  }
}

TaggableUI.propTypes = {
  searchResults: PropTypes.array,
  tagInView: PropTypes.object,
  search: PropTypes.func,
  setSelectedTagFromSearch: PropTypes.func,
  fetchTags: PropTypes.func,
  searchString: PropTypes.string,
  linkedTags: PropTypes.array,
  searchLinkedTagDocument: PropTypes.func,
  setSearchString: PropTypes.func

};

export default TaggableUI;
