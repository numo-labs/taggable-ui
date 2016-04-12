import React, { Component, PropTypes } from 'react';
import ViewPane from '../view-pane';
import SearchPane from '../search-pane';
import { Col, Nav, NavItem, Navbar, Row, Grid } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { AddTagButton } from '../button';

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
          <NavItem><Button className='save' disabled={configurationSaved} bsStyle={buttonAbility} onClick={this.handleOnClick.bind(this)}>Save new configuration</Button></NavItem>
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
  handleOnFilterButtonClick (queryType, tagType) {
    this.props.setTagTypeAndQueryType(queryType, tagType);
  }

  renderSearchPane () {
    const {
      searchResults,
      setSelectedTagFromSearch,
      searchString,
      tagInView,
      queryType,
      tagType,
      inSearch,
      createMode
    } = this.props;
    const searchPane = (
      <Col xs={3} md={3} className='col-centered searchPaneContainer'>
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
          inSearch={inSearch}
          selectedTagId={tagInView}
          searchString={searchString}
          pagination={{
            numberOfItems: Math.ceil(searchResults.total / 10),
            maxButtons: 3,
            onSelect: this.handlePagination.bind(this),
            total: searchResults.total
          }}
          onSubmit={this.handleOnSubmit.bind(this)}
          queryType={queryType}
          tagType={tagType}
          onFilterButtonClick={this.handleOnFilterButtonClick.bind(this)}
          createMode={createMode}
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

  renderTagContent () {
    const {
      tagInView,
      deleteValue,
      addValue,
      addKeyValuePair,
      setNewKeyString,
      setNewValueString,
      newKey,
      newValue,
      createMode,
      emptyTagInView,
      updateDisplayName,
      updateId,
      updateLatitude,
      updateLongitude
    } = this.props;
    const tagTitle = createMode ? 'Create a New Tag' : 'Tag Content';
    const h1Class = createMode ? 'tagContentTitle' : 'tagContentWithoutButton';
    const tagContent = (
      <Col xs={6} md={6} className='col-centered'>
          <h1 className={h1Class}>{tagTitle}</h1>
          <div className='newTagButton'>
            {!createMode && <AddTagButton
              className='createTag'
              onClick={emptyTagInView}
              text='+ Create a new tag'
            />}
          </div>
        <ViewPane
          height={'32vh'}
          item={tagInView}
          items={this.renderLinkedTagList(tagInView.tags)}
          onDeleteValue={deleteValue}
          onAddValue={addValue}
          addKeyValuePair={addKeyValuePair}
          setNewKeyString={setNewKeyString}
          setNewValueString={setNewValueString}
          newKey={newKey}
          newValue={newValue}
          createMode={createMode}
          updateDisplayName={updateDisplayName}
          updateId={updateId}
          updateLongitude={updateLongitude}
          updateLatitude={updateLatitude}
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
  searchString: PropTypes.string,
  linkedTags: PropTypes.array,
  searchLinkedTagDocument: PropTypes.func,
  setSearchString: PropTypes.func,
  queryType: PropTypes.string,
  tagType: PropTypes.string,
  setTagTypeAndQueryType: PropTypes.func,
  saveConfiguration: PropTypes.func,
  configurationSaved: PropTypes.bool,
  inSearch: PropTypes.bool,
  deleteValue: PropTypes.func,
  addValue: PropTypes.func,
  addKeyValuePair: PropTypes.func,
  setNewKeyString: PropTypes.func,
  setNewValueString: PropTypes.func,
  newKey: PropTypes.string,
  newValue: PropTypes.string,
  createMode: PropTypes.bool,
  emptyTagInView: PropTypes.func,
  updateDisplayName: PropTypes.func,
  updateId: PropTypes.func,
  updateLatitude: PropTypes.func,
  updateLongitude: PropTypes.func
};

export default TaggableUI;
