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
                  <input key={value} type='text' className='form-control' value={value} />
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
        <Input type='text' label='ID :' labelClassName='col-xs-6' wrapperClassName='col-xs-10' value={id}/>
        <Input type='text' label='Display name :' labelClassName='col-xs-6' wrapperClassName='col-xs-10' value={displayName}/>
        <div className='content'>
          <Row>
            <Col xs={2}>
              <label>Keys</label>
            </Col>
            <Col xs={12}>
              <label>Values</label>
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

ViewPane.defaultProps = {
  id: '',
  displayName: '',
  metadata: []
};

export default ViewPane;
