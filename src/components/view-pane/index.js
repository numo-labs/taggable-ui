import React, { Component, PropTypes } from 'react';
import { Input, Row, Col } from 'react-bootstrap';
import './styles.css';

class ViewPane extends Component {
  render () {
    const { id, displayName, metadata } = this.props;

    const metadataContent = metadata.map(item => {
      return (
        <Input key={item.key} wrapperClassName='wrapper'>
          <Row>
            <Col xs={6}>
              <input type='text' className='form-control' value={item.key} />
            </Col>
            <Col xs={6}>
              {item.values.map(value => {
                return (
                  <div className='metaValue'>
                    <input key={value} type='text' className='form-control' value={value} />
                  </div>
                );
              })}
              <input type='text' className='form-control' placeholder='add value'/>
            </Col>
          </Row>
        </Input>
      );
    });
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
        <div className='content'>
        <Row>
          <Col xs={1}>
            <h4>Keys:</h4>
          </Col>
          <Col xs={12}>
            <h4>Values:</h4>
          </Col>
        </Row>
        {metadataContent}
        <Row>
          <Col xs={6}>
            <input type='text' className='form-control' placeholder='add new key' />
          </Col>
          <Col xs={6}>
            <input type='text' className='form-control' placeholder='add value' />
          </Col>
          </Row>
        </div>
      </div>
    );
  }
}

ViewPane.propTypes = {
  id: PropTypes.string,
  displayName: PropTypes.string,
  metadata: PropTypes.array
};

export default ViewPane;
