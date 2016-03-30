import React, { Component, PropTypes } from 'react';
import { Input, Row, Col } from 'react-bootstrap';
import { SymbolButton as Button } from '../button';
import './styles.css';

class ViewPane extends Component {
  renderMetadataContent () {
    const { metadata, onHandleButtonClick } = this.props;
    const deleteButton = <Button className='redButton' onHandleClick={onHandleButtonClick} symbol={'x'} />;
    const addButton = <Button onHandleClick={onHandleButtonClick} symbol={'+'} />;
    const metadataContent = metadata.map(item => {
      return (
          <Input key={item.key} wrapperClassName='wrapper' className='metaContent'>
            <Row>
              <Col xs={6}>
                <input type='text' className='form-control' value={item.key} />
              </Col>
              <Col xs={6}>
                {item.values.map(value => {
                  return (
                      <div key={value} className='inputGroup'>
                          <Input type='text' className='form-control' value={value} buttonAfter={deleteButton}/>
                      </div>
                  );
                })}
                <Input type='text' className='form-control' placeholder='add value' buttonAfter={addButton} />
              </Col>
            </Row>
          </Input>
      );
    });
    return metadataContent;
  }
  render () {
    const { id, displayName, onHandleButtonClick, height, handleOnChange } = this.props;
    const addButton = <Button onHandleClick={onHandleButtonClick} symbol={'+'} />;
    return (
      <div>
        <div>
          <h4 className='tagId'>ID:</h4>
          <Input className='tagIdInput' type='text' labelClassName='col-xs-9' wrapperClassName='col-xs-6' value={id}/>
        </div>
        <div>
          <h4 className='displayName'>Display name:</h4>
          <Input className='displayNameInput' type='text' labelClassName='col-xs-9' wrapperClassName='col-xs-6' value={displayName}/>
        </div>
          <Row>
            <Col xs={2}>
              <h4>Keys:</h4>
            </Col>
            <Col xs={12}>
              <h4>Values:</h4>
            </Col>
          </Row>
          <div className='content' style={{height: height}}>
          {this.renderMetadataContent()}
          </div>
          <Row>
            <div className='keyValueContainer'>
              <h4 className='keyValuePair'>Add new key/value pair:</h4>
              <div className='keyValueInput'>
                <Col xs={6}>
                  <Input type='text' onChange={handleOnChange} className='form-control' placeholder='add new key' />
                </Col>
                <Col xs={6}>
                  <Input type='text' className='form-control addNewValue' placeholder='add value' buttonAfter={addButton}/>
                </Col>
              </div>
            </div>
          </Row>
      </div>
    );
  }
}

ViewPane.propTypes = {
  id: PropTypes.string,
  displayName: PropTypes.string,
  metadata: PropTypes.array,
  onHandleButtonClick: PropTypes.func,
  height: PropTypes.string,
  handleOnChange: PropTypes.func
};

ViewPane.defaultProps = {
  id: '',
  displayName: '',
  metadata: []
};

export default ViewPane;
