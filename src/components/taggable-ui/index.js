import React, { Component, PropTypes } from 'react';
import LinkedTags from '../linked-tags';
import ViewPane from '../view-pane';
import SearchPane from '../search-pane';
import { Col, Nav, NavItem, Navbar, Row, Grid } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

require('./styles.css');
import './css/normalize.css';

class TaggableUI extends Component {
  handleOnClick () {
    this.props.saveConfiguration();
  }

  renderNavbar () {
    const { configurationSaved } = this.props;
    const buttonAbility = configurationSaved ? 'default' : 'success';
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
          <NavItem>
            <Button
              className='save'
              disabled={configurationSaved}
              bsStyle={buttonAbility}
              onClick={this.handleOnClick.bind(this)}
            >
              Save new configuration
            </Button>
          </NavItem>
        </Nav>
      </nav>
    );
    return navbar;
  }
  onSearchStringChange (option, text) {
    this.props.setSearchString(text, option);
  }
  handleOnSubmit (option, text) {
    this.props.setSearchString(text, option);
    this.props.fetchTags(0, 10, option);
  }
  handlePagination (option, index) {
    const start = index * 10;
    this.props.fetchTags(start, 10, option);
  }
  handleOnFilterButtonClick (option, queryType, tagType) {
    this.props.setTagTypeAndQueryType(tagType, queryType, option);
  }

  renderSearchPane () {
    const {
      searchResults,
      setSelectedTagFromSearch,
      tagInView,
      inSearch,
      tagType
    } = this.props;
    const searchPane = (
      <Col xs={3} md={3} className='col-centered'>
        <h1 className='searchTagTitle'>Search Tags</h1>
        <SearchPane
          onSearchStringChange={this.onSearchStringChange.bind(this, 'tag')}
          onTagClick={setSelectedTagFromSearch}
          items={searchResults.items.map(result => {
            return {
              id: result._id,
              displayName: result.displayName
            };
          })}
          inSearch={inSearch}
          selectedTagIds={[tagInView._id]}
          pagination={{
            numberOfItems: Math.ceil(searchResults.total / 10),
            maxButtons: 3,
            onSelect: this.handlePagination.bind(this, 'tag'),
            total: searchResults.total
          }}
          tagType={tagType}
          onSubmit={this.handleOnSubmit.bind(this, 'tag')}
          onFilterButtonClick={this.handleOnFilterButtonClick.bind(this, 'tag')}
        />
      </Col>
    );
    return searchPane;
  }
  createLinkedTagsArray (tags) {
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
      tagInView
    } = this.props;
    const tagLinks = (
      <Col xs={3} md={3} className='col-centered'>
        <h1 className='linkedTitle title'>Linked Tags</h1>
        <LinkedTags
          items={this.createLinkedTagsArray(tagInView.tags)}
          onSearchSubmit={search}
          onTagClick={this.handleOnSubmit.bind(this)}
          searchResults={searchResults}
          selectedTagId={tagInView}
        />
      </Col>
    );
    return tagLinks;
  }

  renderTagContent () {
    const {
      tagInView,
      deleteValue,
      parentTagSearchResults,
      inParentTagSearch,
      addParentTag,
      removeParentTag,
      parentTagTagType,
      setSearchString,
      fetchTags,
      setTagTypeAndQueryType
    } = this.props;
    const tagContent = (
      <Col xs={6} md={6} className='col-centered'>
        <h1 className='tagContentTitle'>Tag Content</h1>
        <ViewPane
          height={'35vh'}
          item={tagInView}
          linkedTags={this.createLinkedTagsArray(tagInView.tags)}
          onDeleteValue={deleteValue}
          onSearchStringChange={this.onSearchStringChange.bind(this, 'parent')}
          onTagClick={addParentTag}
          handleButtonClick={removeParentTag}
          items={parentTagSearchResults.items.map(result => {
            return {
              id: result._id,
              displayName: result.displayName
            };
          })}
          tagType={parentTagTagType}
          inSearch={inParentTagSearch}
          pagination={{
            numberOfItems: Math.ceil(parentTagSearchResults.total / 10),
            maxButtons: 3,
            onSelect: this.handlePagination.bind(this, 'parent'),
            total: parentTagSearchResults.total
          }}
          onSubmit={this.handleOnSubmit.bind(this, 'parent')}
          onFilterButtonClick={this.handleOnFilterButtonClick.bind(this, 'parent')}
          setSearchString={setSearchString}
          fetchTags={fetchTags}
          setTagTypeAndQueryType={setTagTypeAndQueryType}
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
        </div>
      );
    } else {
      return (
        <h1 className='well problems'>IF YOU&#39;RE HAVING TAG PROBLEMS I FEEL BAD FOR YOU SON <br />
         I&#39;VE GOT 99 PROBLEMS BUT A LINK AIN&#39;T 1</h1>
      );
    }
  }

  render () {
    return (
      <div>
        {this.renderNavbar()}
        <Grid fluid>
          <Row>
            <Col xs={4}>
              {this.renderSearchPane()}
            </Col>
            <Col xs={8}>
              {this.renderItemContent()}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

TaggableUI.propTypes = {
  searchResults: PropTypes.object,
  tagInView: PropTypes.object,
  search: PropTypes.func,
  setSelectedTagFromSearch: PropTypes.func,
  fetchTags: PropTypes.func,
  linkedTags: PropTypes.array,
  searchLinkedTagDocument: PropTypes.func,
  setSearchString: PropTypes.func,
  setTagTypeAndQueryType: PropTypes.func,
  saveConfiguration: PropTypes.func,
  configurationSaved: PropTypes.bool,
  inSearch: PropTypes.bool,
  deleteValue: PropTypes.func,
  parentTagSearchResults: PropTypes.object,
  inParentTagSearch: PropTypes.bool,
  addParentTag: PropTypes.func,
  removeParentTag: PropTypes.func,
  tagType: PropTypes.string,
  parentTagTagType: PropTypes.string
};

export default TaggableUI;
