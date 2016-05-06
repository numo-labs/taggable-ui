import React, { Component, PropTypes } from 'react';
import { Row, Col, Nav, NavItem, Panel } from 'react-bootstrap';
import LinkedTagsList from '../linked-tags-list';
import SearchList from '../search-list';
import './styles.css';
import ContentEditor from '../content-editor';

class ViewPane extends Component {
  constructor () {
    super();
    this.state = {
      activeKey: 1
    };
  }

  renderTabs () {
    return (
      <Nav
       bsStyle='pills'
       activeKey={this.state.activeKey}
       onSelect={this.handleSelect.bind(this)}
      >
        <NavItem eventKey={1}>Tag Content</NavItem>
        <NavItem eventKey={2}>Parents</NavItem>
      </Nav>
    );
  }

  handleTagClick (id) {
    const {
      fetchTags,
      setSearchString,
      setTagTypeAndQueryType
    } = this.props;
    setSearchString(id, 'tag');
    setTagTypeAndQueryType(undefined, 'QUERY_ID', 'tag');
    fetchTags(0, 10, 'tag');
  }

  renderContent () {
    const {
      item,
      onSearchStringChange,
      onSubmit,
      items,
      onTagClick,
      pagination,
      onFilterButtonClick,
      inSearch,
      linkedTags,
      handleButtonClick,
      tagType,
      saveTagContent
    } = this.props;
    if (item) {
      if (this.state.activeKey === 1) {
        return (
          <div>
            {this.renderTabs()}<br/>
          <Panel header='Modify tag'>
              <ContentEditor tagDoc={item} onSubmit={saveTagContent}/>
            </Panel>
          </div>
        );
      } else {
        console.log('search', items);
        return (
          <div>
            {this.renderTabs()}
            <div className='listBuffer'>
            <Row>
              <Col xs={6}>
                <h3>Add Parent</h3>
                <SearchList
                  symbol={'+'}
                  withButtons
                  onSearchStringChange={onSearchStringChange}
                  onSubmit={onSubmit}
                  items={items}
                  onTagClick={onTagClick}
                  pagination={pagination}
                  onFilterButtonClick={onFilterButtonClick}
                  inSearch={inSearch}
                  selectedTagIds={linkedTags.map(tag => tag.node)}
                  tagType={tagType}
                />
              </Col>
              <Col xs={6}>
              <h3 className='parentListTitle'>Parent List</h3>
                <LinkedTagsList
                  items={linkedTags}
                  symbol={'x'}
                  handleButtonClick={handleButtonClick}
                  handleTagClick={this.handleTagClick.bind(this)}
                />
              </Col>
            </Row>
            </div>
          </div>
        );
      }
    }
  }

  handleSelect (selectedKey) {
    this.setState({
      activeKey: selectedKey
    });
  }
  render () {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

ViewPane.propTypes = {
  // search pane
  onFilterButtonClick: PropTypes.func,
  inSearch: PropTypes.bool,
  tagType: PropTypes.string,
  fetchTags: PropTypes.func,
  setSearchString: PropTypes.func,
  setTagTypeAndQueryType: PropTypes.func,
  linkedTags: PropTypes.array,
  onSearchStringChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onTagClick: PropTypes.func,
  items: PropTypes.array, // items returned from search

  // tag in view linked tag list
  handleButtonClick: PropTypes.func,
  pagination: PropTypes.object,

  // tag in view content
  newKey: PropTypes.string,
  newValue: PropTypes.string,
  metadata: PropTypes.array,
  item: PropTypes.object, // selected tag,
  saveTagContent: PropTypes.func,

  // tag in view update methods
  addKeyValuePair: PropTypes.func,
  setNewKeyString: PropTypes.func,
  setNewValueString: PropTypes.func,
  onDeleteValue: PropTypes.func,
  onAddValue: PropTypes.func,
  removeKey: PropTypes.func,
  createMode: PropTypes.bool,
  updateDisplayName: PropTypes.func,
  updateId: PropTypes.func,
  updateLatitude: PropTypes.func,
  updateLongitude: PropTypes.func,
  height: PropTypes.string // height of metadata content field
};

ViewPane.defaultProps = {
  id: '',
  displayName: '',
  metadata: []
};

export default ViewPane;
