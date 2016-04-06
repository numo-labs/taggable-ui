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
    const tagContentHeader = (
      <div>
        <div>
          <h4 className='tagId'>ID:</h4>
          <Input className='tagIdInput' type='text' disabled labelClassName='col-xs-9' wrapperClassName='col-xs-9' value={item._id} />
        </div>
        <div>
          <h4 className='displayName'>Display name:</h4>
          <Input className='displayNameInput' type='text' labelClassName='col-xs-9' wrapperClassName='col-xs-9' value={item.displayName}/>
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
  renderValues (content, index, onButtonClick) {
    const deleteButton = <Button className='redButton' onHandleClick={onButtonClick} symbol={'x'} />;
    const addButton = <Button onHandleClick={onButtonClick} symbol={'+'} />;
    if (content.values) {
      return content.values.map(value => {
        return (
            <div key={value} className='inputGroup'>
                <Input type='text' className='form-control' value={value} buttonAfter={deleteButton}/>
            </div>
          );
      });
    } else {
      return (
        <div key={index} className='inputGroup'>
            <Input type='text' className='form-control' buttonAfter={addButton}/>
        </div>
      );
    }
  }
  renderMetadataContent (item, onButtonClick, height) {
    if (item.metadata) {
      const addButton = <Button onHandleClick={onButtonClick} symbol={'+'} />;
      const metadataContent = item.metadata.map((content, index) => {
        return (
          <Input key={content.key} wrapperClassName='wrapper' className='metaContent'>
            <Row>
              <Col xs={6}>
                <input type='text' className='form-control' value={content.key} />
              </Col>
              <Col xs={6}>
                {this.renderValues(content, index, onButtonClick)}
                <Input type='text' className='form-control' placeholder='add value' buttonAfter={addButton} />
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
              <Input type='text' onChange={onChange} className='form-control' placeholder='add new key' />
            </Col>
            <Col xs={6}>
              <Input type='text' className='form-control addNewValue' placeholder='add value' buttonAfter={addButton}/>
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
      <Nav bsStyle='tabs' justified activeKey={this.state.activeKey} onSelect={this.handleSelect.bind(this)}>
        <NavItem eventKey={1}>Tag Content</NavItem>
        <NavItem eventKey={2}>Parents</NavItem>
        <NavItem eventKey={3}>Children</NavItem>
      </Nav>
    );
  }

  renderContent () {
    const {
      item,
      onButtonClick,
      onChange,
      height,
      items
    } = this.props;
    if (item) {
      if (this.state.activeKey === 1) {
        return (
          <div>
            {this.renderTabs()}
            {this.renderTagContentHeader(item)}
            {this.renderMetadataContent(item, onButtonClick, height)}
            {this.renderAddNewKeyValue(onButtonClick, onChange)}
          </div>
        );
      } else if (this.state.activeKey === 2) {
        return (
          <div>
            {this.renderTabs()}
            <div className='listBuffer'>
            <Row>
              <Col xs={6}>
                <h3>Add Parent</h3>
                <SearchList symbol={'+'} withButtons />
              </Col>
              <Col xs={6}>
              <h3 className='parentListTitle'>Parent List</h3>
                <LinkedTagsList items={items} symbol={'x'} />
              </Col>
            </Row>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            {this.renderTabs()}
            <h1>children</h1>
          </div>
        );
      }
    }
  }

  handleSelect (selectedKey) {
    console.log('SELECTED KEY', selectedKey);
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
  height: PropTypes.string,
  onChange: PropTypes.func,
  item: PropTypes.object,
  items: PropTypes.array
};

ViewPane.defaultProps = {
  id: '',
  displayName: '',
  metadata: []
};

export default ViewPane;
