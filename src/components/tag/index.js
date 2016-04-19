import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import './styles.css';

class Tag extends Component {
  handleOnClick () {
    this.props.onClick(this.props.id);
  }
  render () {
    const { id, displayName, selected, active } = this.props;
    const statusClass = active ? '' : 'tag_inactive';
    return (
      <Button
        className={`tag ${statusClass}`}
        bsSize='xsmall'
        bsStyle={selected ? 'primary' : 'default'}
        onClick={this.handleOnClick.bind(this)}
      >
        <p className='tag__name'>{displayName}</p>
        <p className='tag__id'>{id}</p>
      </Button>
    );
  }
}

Tag.propTypes = {
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  displayName: PropTypes.string,
  id: PropTypes.string,
  active: PropTypes.bool
};

Tag.defaultProps = {
  onClick: () => {},
  active: true
};

export default Tag;
