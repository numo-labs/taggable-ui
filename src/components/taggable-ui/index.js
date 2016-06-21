import React, { Component, PropTypes } from 'react';
import ViewPane from '../view-pane';
import SearchPane from '../search-pane';
import { Col, Nav, Navbar, Row, Grid, NavItem, Button } from 'react-bootstrap';
import { AddTagButton } from '../button';
import SavingNotificationModal from '../saving-notification-modal';

require('./styles.css');
import './css/normalize.css';

class TaggableUI extends Component {

  renderNavbar () {
    const { readOnly, logOut } = this.props;
    const navbar = (
      <Navbar className='navbar navbar-default navi'>
        <Navbar.Header style={{width: '100%'}}>
          <Navbar.Brand>
            <Nav className='pull-left'>
              <h2 className='numoTitle'>Numo Labs Tag System</h2>
            </Nav>
          </Navbar.Brand>
          <Nav className='pull-right'>
            <NavItem>
              <Button bsStyle='success' onClick={logOut}>LOGOUT</Button>
            </NavItem>
              {
                readOnly && (
                  <Nav className='nav-read-only'>
                    <div>READ ONLY</div>
                  </Nav>
                )
              }
          </Nav>
        </Navbar.Header>
      </Navbar>
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
      tagInView,
      tagType,
      inSearch,
      createMode,
      cleanSearchPane,
      fetchTagDoc
    } = this.props;
    const searchPane = (
      <Col xs={3} md={3} className='col-centered searchPaneContainer'>
        <SearchPane
          onSearchStringChange={this.onSearchStringChange.bind(this, 'tag')}
          onTagClick={fetchTagDoc}
          items={searchResults.items.map(result => {
            return {
              id: result.tagid,
              name: result.name
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
          createMode={createMode}
          cleanSearchPane={cleanSearchPane}
          onSubmit={this.handleOnSubmit.bind(this, 'tag')}
          onFilterButtonClick={this.handleOnFilterButtonClick.bind(this, 'tag')}
        />
      </Col>
    );
    return searchPane;
  }
  handleOnCreateClick () {
    const { emptyTagInView, cleanSearchPane } = this.props;
    emptyTagInView();
    cleanSearchPane();
  }
  renderTagContent () {
    const {
      tagInView,
      parentTagSearchResults,
      inParentTagSearch,
      addParentTag,
      removeParentTag,
      parentTagTagType,
      setSearchString,
      fetchTags,
      setTagTypeAndQueryType,
      createMode,
      saveTagContent,
      configurationSaved,
      saveNewConfig,
      modalVisible,
      toggleSaveModalState,
      createEnabled,
      readOnly
    } = this.props;
    const tagContent = (
      <Col xs={6} md={6}>
        <div className='newTagButton'>
          <AddTagButton
            className='createTag'
            onClick={this.handleOnCreateClick.bind(this)}
            text='+ Create a new tag'
            disabled={!createEnabled}
          />
        </div>
        <SavingNotificationModal modalVisible={modalVisible} closeModal={toggleSaveModalState}/>
        <ViewPane
          saveNewConfig={saveNewConfig}
          configurationSaved={configurationSaved}
          height={'32vh'}
          item={tagInView}
          linkedTags={tagInView.tags}
          onSearchStringChange={this.onSearchStringChange.bind(this, 'parent')}
          onTagClick={addParentTag}
          handleButtonClick={removeParentTag}
          saveTagContent={saveTagContent}
          items={parentTagSearchResults.items.map(result => {
            return {
              id: result.tagid,
              name: result.name
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
          createMode={createMode}
          readOnly={readOnly}
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
    }
  }

  render () {
    return (
      <div>
        {this.renderNavbar()}
        <br/>
        <Grid fluid>
          <Row>
            <Col xs={3} >
              {this.renderSearchPane()}
            </Col>
            <Col xs={9}>
              {this.renderItemContent()}
            </Col>
          </Row>
        </Grid>
        </div>
    );
  }
}

TaggableUI.propTypes = {
  // view pane
  saveTagContent: PropTypes.func,
  tagInView: PropTypes.object,
  saveConfiguration: PropTypes.func,
  configurationSaved: PropTypes.bool,
  parentTagSearchResults: PropTypes.object,
  inParentTagSearch: PropTypes.bool,
  addParentTag: PropTypes.func,
  removeParentTag: PropTypes.func,
  parentTagTagType: PropTypes.string,
  modalVisible: PropTypes.boolean,
  saveNewConfig: PropTypes.func,
  toggleSaveModalState: PropTypes.func,
  createMode: PropTypes.bool,
  // search pane
  searchResults: PropTypes.object,
  search: PropTypes.func,
  fetchTagDoc: PropTypes.func,
  fetchTags: PropTypes.func,
  setSearchString: PropTypes.func,
  setTagTypeAndQueryType: PropTypes.func,
  inSearch: PropTypes.bool,
  tagType: PropTypes.string,
  emptyTagInView: PropTypes.func,
  cleanSearchPane: PropTypes.func,
  displayDialog: PropTypes.bool,
  logOut: PropTypes.func,
  createEnabled: PropTypes.bool,
  readOnly: PropTypes.bool
};

export default TaggableUI;
