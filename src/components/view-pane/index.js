import React, { Component, PropTypes } from 'react';
import { Input, Row, Col } from 'react-bootstrap';
import './styles.css';

class ViewPane extends Component {
  render () {
    const { id, displayName } = this.props;
    const metadata = [
      {
        key: 'meta:location',
        values: ['13.1777', '-59.63560']
      },
      {
        key: 'search:en',
        values: ['All Seasons Resort Europe']
      },
      {
        key: 'search:fr',
        values: ['All Seasons Resort en Europe', 'All Seasons Resort Europe'] // Can search for both when in language FR context
      },
      {
        key: 'label:en',
        values: ['All Seasons Resort Europa']
      }
    ];
    const metadataContent = metadata.map(item => {
      return (
        <Input key={item.key} wrapperClassName='wrapper'>
          <Row>
            <Col xs={3}>
              <input type='text' className='form-control' value={item.key} />
            </Col>
            <Col xs={3}>
              {item.values.map(value => {
                return (
                  <input key={value} type='text' className='form-control' value={value} />
                );
              })}
            </Col>
          </Row>
        </Input>
      );
    });
    return (
      <div>
        <Input type='text' label='ID :' labelClassName='col-xs-2' wrapperClassName='col-xs-10' value={id}/>
        <Input type='text' label='Display name :' labelClassName='col-xs-2' wrapperClassName='col-xs-10' value={displayName}/>
        <div className='content'>
        <Row>
          <Col xs={3}>
            <label>Keys</label>
          </Col>
          <Col xs={3}>
            <label>Values</label>
          </Col>
        </Row>
        {metadataContent}
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
