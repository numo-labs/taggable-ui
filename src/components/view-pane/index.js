import React, { Component, PropTypes } from 'react';
import { Input, Row, Col, Nav, NavItem } from 'react-bootstrap';
import { SymbolButton as Button } from '../button';
import LinkedTagsList from '../linked-tags-list';
import SearchList from '../search-list';
import './styles.css';

class ViewPane extends Component {
  constructor () {
    super();
    this.state = {
      activeKey: 1
    };
  }
  renderTagContentHeader (item) {
    console.log('location', item.location);
    const tagContentHeader = (
      <div>
        <div>
          <h4 className='tagId'>ID:</h4>
          <Input
            className='tagIdInput'
            type='text'
            disabled
            labelClassName='col-xs-9'
            wrapperClassName='col-xs-9'
            value={item._id}
          />
        </div>
        <div>
          <h4 className='displayName'>Display name:</h4>
          <Input
            className='displayNameInput'
            type='text'
            labelClassName='col-xs-9'
            wrapperClassName='col-xs-9'
            value={item.displayName}
          />
        </div>
        <div>
          <h4 className='location'>Location:</h4>
          <Input
            className='locationInput'
            type='text'
            labelClassName='col-xs-9'
            wrapperClassName='col-xs-9'
            value={item.location}
          />
        </div>
        <Row>
          <Col xs={2}>
            <h4>Keys:</h4>
          </Col>
          <Col xs={12}>
            <h4>Values:</h4>
          </Col>
        </Row>
      </div>
    );
    return tagContentHeader;
  }
  renderValues (content, metaIndex, onDeleteValue) {
    if (content.values) {
      return content.values.map((value, index) => {
        const deleteButton = <Button
          className='redButton'
          onHandleClick={() => onDeleteValue(metaIndex, index)} symbol={'x'}
        />;
        return (
          <div key={value} className='inputGroup'>
            <Input
              type='text'
              className='form-control'
              value={value}
              buttonAfter={deleteButton}
            />
          </div>
        );
      });
    } else {
      const addButton = <Button onHandleClick={onDeleteValue} symbol={'+'} />;
      return (
        <div key={metaIndex} className='inputGroup'>
          <Input
            type='text'
            className='form-control'
            buttonAfter={addButton}
          />
        </div>
      );
    }
  }
  renderMetadataContent (item, onDeleteValue, height) {
    if (item.metadata) {
      const addButton = <Button onHandleClick={onDeleteValue} symbol={'+'} />;
      const metadataContent = item.metadata.map((content, index) => {
        return (
          <Input
            key={content.key}
            wrapperClassName='wrapper'
            className='metaContent'
          >
            <Row>
              <Col xs={6}>
                <Input
                  type='text'
                  className='form-control'
                  value={content.key}
                />
              </Col>
              <Col xs={6}>
                {this.renderValues(content, index, onDeleteValue)}
                <Input
                  type='text'
                  className='form-control'
                  placeholder='add value'
                  buttonAfter={addButton}
                />
              </Col>
            </Row>
          </Input>
        );
      });
      return (
        <div className='content' style={{height: height}}>
          {metadataContent}
        </div>
      );
    }
    return;
  }
  renderAddNewKeyValue (onButtonClick, onChange) {
    const addButton = <Button onHandleClick={onButtonClick} symbol={'+'} />;
    const addNewKeyValue = (
      <Row>
        <div className='keyValueContainer'>
          <h4 className='keyValuePair'>Add new key value pair:</h4>
          <div className='keyValueInput'>
          <Row>
            <Col xs={6}>
              <Input
                type='text'
                onChange={onChange}
                className='form-control'
                placeholder='add new key'
              />
            </Col>
            <Col xs={6}>
              <Input
                type='text'
                className='form-control addNewValue'
                placeholder='add value'
                buttonAfter={addButton}
              />
            </Col>
          </Row>
          </div>
        </div>
      </Row>
    );
    return addNewKeyValue;
  }
  renderTabs () {
    return (
      <Nav
        bsStyle='tabs'
        justified
        activeKey={this.state.activeKey}
        onSelect={this.handleSelect.bind(this)}
      >
        <NavItem eventKey={1}>Tag Content</NavItem>
        <NavItem eventKey={2}>Parents</NavItem>
      </Nav>
    );
  }

  renderContent () {
    const {
      item,
      onDeleteValue,
      onButtonClick,
      onChange,
      height,
      onSearchStringChange,
      onSubmit,
      items,
      onTagClick,
      pagination,
      onFilterButtonClick,
      inSearch,
      linkedTags,
      handleButtonClick,
      tagType
      // fetchTags,
      // setSearchString,
      // setTagTypeAndQueryType
    } = this.props;
    if (item) {
      if (this.state.activeKey === 1) {
        return (
          <div>
            {this.renderTabs()}
            {this.renderTagContentHeader(item)}
            {this.renderMetadataContent(item, onDeleteValue, height)}
            {this.renderAddNewKeyValue(onButtonClick, onChange)}
          </div>
        );
      } else {
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
                  selectedTagIds={linkedTags.map(tag => tag.id)}
                  tagType={tagType}
                />
              </Col>
              <Col xs={6}>
              <h3 className='parentListTitle'>Parent List</h3>
                <LinkedTagsList
                  items={linkedTags}
                  symbol={'x'}
                  handleButtonClick={handleButtonClick}
                  // handleTagClick={(id) => { setSearchString(id, 'tag'); setTagTypeAndQueryType(undefined, 'QUERY_ID', 'tag'); fetchTags(0, 10, 'tag'); }}
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
  metadata: PropTypes.array,
  onButtonClick: PropTypes.func,
  onDeleteValue: PropTypes.func,
  height: PropTypes.string,
  onChange: PropTypes.func,
  item: PropTypes.object,
  items: PropTypes.array,
  onSearchStringChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onTagClick: PropTypes.func,
  pagination: PropTypes.object,
  onFilterButtonClick: PropTypes.func,
  inSearch: PropTypes.bool,
  linkedTags: PropTypes.array,
  handleButtonClick: PropTypes.func,
  tagType: PropTypes.string,
  fetchTags: PropTypes.func,
  setSearchString: PropTypes.func,
  setTagTypeAndQueryType: PropTypes.func
};

ViewPane.defaultProps = {
  id: '',
  displayName: '',
  metadata: []
};

export default ViewPane;
