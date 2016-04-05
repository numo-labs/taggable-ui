import React, { Component, PropTypes } from 'react';
import { Input, Row, Col } from 'react-bootstrap';
import { SymbolButton as Button } from '../button';
import './styles.css';

class ViewPane extends Component {
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
    console.log(item.metadata);
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
            <Col xs={6}>
              <Input type='text' onChange={onChange} className='form-control' placeholder='add new key' />
            </Col>
            <Col xs={6}>
              <Input type='text' className='form-control addNewValue' placeholder='add value' buttonAfter={addButton}/>
            </Col>
          </div>
        </div>
      </Row>
    );
    return addNewKeyValue;
  }
  render () {
    const {
      item,
      onButtonClick,
      onChange,
      height
    } = this.props;
    console.log('hkfhdtbbfnyvbrtfcnv', item);
    if (item) {
      return (
        <div>
            {this.renderTagContentHeader(item)}
            {this.renderMetadataContent(item, onButtonClick, height)}
            {this.renderAddNewKeyValue(onButtonClick, onChange)}
        </div>
      );
    }
    return;
  }
}

ViewPane.propTypes = {
  metadata: PropTypes.array,
  onButtonClick: PropTypes.func,
  height: PropTypes.string,
  onChange: PropTypes.func,
  item: PropTypes.object
};

ViewPane.defaultProps = {
  id: '',
  displayName: '',
  metadata: []
};

export default ViewPane;
