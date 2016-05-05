import React, { Component, PropTypes } from 'react';
import ViewPane from '../view-pane';
import SearchPane from '../search-pane';
import { Col, Nav, NavItem, Navbar, Row, Grid } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { AddTagButton } from '../button';
import SavingNotificationModal from '../saving-notification-modal';

require('./styles.css');
import './css/normalize.css';

class TaggableUI extends Component {
  handleOnClick () {
    this.props.saveNewConfig();
    this.showConfirmationModal();
  }

  constructor () {
    super();
    this.state = {
      confirmationDialog: false
    };
    this.showConfirmationModal = this.showConfirmationModal.bind(this);
    this.closeConfirmationModal = this.closeConfirmationModal.bind(this);
  }

  showConfirmationModal () {
    this.setState({confirmationDialog: true});
  }

  closeConfirmationModal () {
    this.setState({confirmationDialog: false});
  }

  renderNavbar () {
    const { props: { configurationSaved }, state: { confirmationDialog } } = this;
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
        <SavingNotificationModal modalVisible={confirmationDialog} closeModal={this.closeConfirmationModal}/>
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
      tagInView,
      tagType,
      inSearch,
      createMode,
      cleanSearchPane,
      fetchTagDoc
    } = this.props;
    const searchPane = (
      <Col xs={3} md={3} className='col-centered searchPaneContainer'>
        <h1 className='searchTagTitle'>Search Tags</h1>
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
      deleteValue,
      parentTagSearchResults,
      inParentTagSearch,
      addParentTag,
      removeParentTag,
      parentTagTagType,
      setSearchString,
      fetchTags,
      setTagTypeAndQueryType,
      addValue,
      addKeyValuePair,
      setNewKeyString,
      setNewValueString,
      newKey,
      newValue,
      createMode,
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
              onClick={this.handleOnCreateClick.bind(this)}
              text='+ Create a new tag'
            />}
          </div>
        <ViewPane
          height={'32vh'}
          item={tagInView}
          linkedTags={tagInView.tags}
          onDeleteValue={deleteValue}
          onSearchStringChange={this.onSearchStringChange.bind(this, 'parent')}
          onTagClick={addParentTag}
          handleButtonClick={removeParentTag}
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
  fetchTagDoc: PropTypes.func,
  fetchTags: PropTypes.func,
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
  parentTagTagType: PropTypes.string,
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
  updateLongitude: PropTypes.func,
  cleanSearchPane: PropTypes.func,
  displayDialog: PropTypes.bool,
  saveNewConfig: PropTypes.func
};

export default TaggableUI;
