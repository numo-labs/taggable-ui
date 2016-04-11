import React, { Component, PropTypes } from 'react';
import { Input, Row, Col, Nav, NavItem, Button } from 'react-bootstrap';
import { SymbolButton } from '../button';
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
  renderTagContentHeader () {
    const { item } = this.props;
    const tagContentHeader = (
      <div>
        <div>
          <h4 className='displayName'>Display name:</h4>
          <Input className='displayNameInput' type='text' labelClassName='col-xs-9' wrapperClassName='col-xs-9' value={item.displayName}/>
        </div>
        <div>
          <h4 className='tagId'>ID:</h4>
          <Input className='tagIdInput' type='text' disabled labelClassName='col-xs-9' wrapperClassName='col-xs-9' value={item._id} />
        </div>

        <div>
          <h4 className='location'>Location:</h4>
          <Input className='locationInput' type='text' labelClassName='col-xs-9' wrapperClassName='col-xs-9' value={item.location}/>
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
    const handleOnDeleteValue = (metaIndex, index) => {
      onDeleteValue(metaIndex, index);
    };
    if (content.values) {
      return content.values.map((value, index) => {
        const deleteButton = <SymbolButton className='redButton' onHandleClick={() => handleOnDeleteValue(metaIndex, index)} symbol={'x'} />;
        return (
            <div key={value} className='inputGroup'>
                <Input type='text' className='form-control' value={value} buttonAfter={deleteButton}/>
            </div>
          );
      });
    }
  }
  renderMetadataContent () {
    const { item, onDeleteValue, onAddValue, height } = this.props;
    const handleOnAddValue = (index, value, valuesLength) => {
      onAddValue(index, value);
    };
    if (item.metadata) {
      const metadataContent = item.metadata.map((content, index) => {
        const addButton = <SymbolButton onHandleClick={() => handleOnAddValue(index, this.refs[index].getValue())} symbol={'+'} />;
        return (
          <Input key={content.key} wrapperClassName='wrapper' className='metaContent'>
            <Row>
              <Col xs={6}>
                <Input type='text' className='form-control' value={content.key} />
              </Col>
              <Col xs={6}>
                {this.renderValues(content, index, onDeleteValue)}
                <Input ref={index} type='text' className='form-control' placeholder='add value' buttonAfter={addButton} />
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
  renderAddNewKeyValue () {
    const handleAddKeyValuePair = (key, value) => {
      addKeyValuePair(key, value);
    };
    const { addKeyValuePair, setNewKeyString, setNewValueString, newKey, newValue } = this.props;
    const disableButton = newKey.length > 0 && newValue.length > 0;
    const keyValueStyle = disableButton ? 'success' : 'default';
    const addButton = <Button disabled={!disableButton} className='keyValueButton' bsStyle={keyValueStyle} onClick={() => handleAddKeyValuePair(this.refs.newKey.getValue(), this.refs.newValue.getValue())} symbol={'+'}>+</Button>;
    const addNewKeyValue = (
      <Row>
        <div className='keyValueContainer'>
          <h4 className='keyValuePair'>Add new key value pair:</h4>
          <div className='keyValueInput'>
          <Row>
            <Col xs={6}>
              <Input type='text' onChange={(e) => setNewKeyString(e.target.value)} ref='newKey' className='form-control' placeholder='add new key' />
            </Col>
            <Col xs={6}>
              <Input type='text' onChange={(e) => setNewValueString(e.target.value)} ref='newValue' className='form-control addNewValue' placeholder='add value' buttonAfter={addButton}/>
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
      </Nav>
    );
  }

  renderContent () {
    const {
      item,
      items
    } = this.props;
    if (item) {
      if (this.state.activeKey === 1) {
        return (
          <div>
            {this.renderTabs()}
            {this.renderTagContentHeader()}
            {this.renderMetadataContent()}
            {this.renderAddNewKeyValue()}
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
  onAddValue: PropTypes.func,
  height: PropTypes.string,
  onChange: PropTypes.func,
  item: PropTypes.object,
  items: PropTypes.array,
  addKeyValuePair: PropTypes.func,
  setNewKeyString: PropTypes.func,
  setNewValueString: PropTypes.func,
  newKey: PropTypes.string,
  newValue: PropTypes.string,
  removeKey: PropTypes.func
};

ViewPane.defaultProps = {
  id: '',
  displayName: '',
  metadata: []
};

export default ViewPane;
