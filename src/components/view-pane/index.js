import React, { Component, PropTypes } from 'react';
import { Row, Col, Nav, NavItem, Panel } from 'react-bootstrap';
import LinkedTagsList from '../linked-tags-list';
import SearchList from '../search-list';
import './styles.css';
import ContentEditor from '../content-editor';
import SavingNotificationModal from '../saving-notification-modal';
import { Button } from 'react-bootstrap';

class ViewPane extends Component {
  constructor () {
    super();
    this.state = {
      activeKey: 1,
      activeLinksKey: 1,
      confirmationDialog: false
    };
    this.renderLinksView = this.renderLinksView.bind(this);
    this.showConfirmationModal = this.showConfirmationModal.bind(this);
    this.closeConfirmationModal = this.closeConfirmationModal.bind(this);
  }

  handleOnClick () {
    this.props.saveNewConfig();
    this.showConfirmationModal();
  }

  showConfirmationModal () {
    this.setState({confirmationDialog: true});
  }

  closeConfirmationModal () {
    this.setState({confirmationDialog: false});
  }

  renderTabs () {
    return (
      <Nav
       bsStyle='pills'
       activeKey={this.state.activeKey}
       onSelect={this.handleSelect.bind(this, 'activeKey')}
      >
        <NavItem eventKey={1}>Tag Content</NavItem>
        <NavItem eventKey={2}>Links</NavItem>
      </Nav>
    );
  }

  renderLinkTabs () {
    return (
      <Nav
       bsStyle='pills'
       activeKey={this.state.activeLinksKey}
       onSelect={this.handleSelect.bind(this, 'activeLinksKey')}
      >
        <NavItem eventKey={1}>Incoming</NavItem>
        <NavItem eventKey={2}>Outgoing</NavItem>
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

  renderLinksView () {
    const { item, handleButtonClick } = this.props;
    if (this.state.activeLinksKey === 1) {
      return (
        <LinkedTagsList
          items={item.links.incoming}
          symbol={'x'}
          handleTagClick={this.handleTagClick.bind(this)}
          withButtons={false}
        />
      );
    } else {
      return (
        <LinkedTagsList
          items={item.links.outgoing}
          symbol={'x'}
          handleButtonClick={handleButtonClick}
          handleTagClick={this.handleTagClick.bind(this)}
        />
      );
    }
  }

  renderContent () {
    const {
      props: {
        item,
        onSearchStringChange,
        onSubmit,
        items,
        onTagClick,
        pagination,
        onFilterButtonClick,
        inSearch,
        linkedTags,
        tagType,
        saveTagContent,
        configurationSaved
      },
      state: {
        confirmationDialog
      }
    } = this;
    const buttonAbility = configurationSaved ? 'default' : 'success';
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
        return (
          <div>
            {this.renderTabs()}
            <div className='listBuffer'>
            <Row>
              <Col xs={6}>
                <h4>Add Outgoing Link</h4>
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
                {this.renderLinkTabs()}
                {this.renderLinksView()}
                <Button
                  className='save'
                  disabled={configurationSaved}
                  bsStyle={buttonAbility}
                  onClick={this.handleOnClick.bind(this)}
                >
                  Save current  configuration
                </Button>
                <SavingNotificationModal modalVisible={confirmationDialog} closeModal={this.closeConfirmationModal}/>
              </Col>
            </Row>
            </div>
          </div>
        );
      }
    }
  }

  handleSelect (state, selectedKey) {
    this.setState({
      [state]: selectedKey
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
  item: PropTypes.object, // selected tag,
  saveTagContent: PropTypes.func,
  createMode: PropTypes.bool,
  configurationSaved: PropTypes.bool,
  saveNewConfig: PropTypes.func
};

ViewPane.defaultProps = {
  id: '',
  displayName: '',
  metadata: []
};

export default ViewPane;
