import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import './styles.css';

class LinkedTag extends Component {
  handleOnClick () {
    this.props.onClick(this.props.id);
  }
  render () {
    const { id, displayName, active, relationType } = this.props;
    const statusClass = active ? '' : 'tag_inactive';
    return (
      <Button
        className={`tag ${statusClass}`}
        bsSize='xsmall'
        bsStyle={'default'}
        onClick={this.handleOnClick.bind(this)}
      >
        <p className='tag__name'>{displayName}</p>
        <p className='tag__id'>{id}</p>
        <p className='tag__id'>{'type:' + relationType}</p>
      </Button>
    );
  }
}

LinkedTag.propTypes = {
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  displayName: PropTypes.string,
  id: PropTypes.string,
  active: PropTypes.bool,
  relationType: PropTypes.string
};

LinkedTag.defaultProps = {
  onClick: () => {},
  active: true
};

export default LinkedTag;
