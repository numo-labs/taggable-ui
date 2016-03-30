import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import './styles.css';

class Tag extends Component {
  render () {
    const { tagName, onClick, id, selected } = this.props;
    return (
      <Button className='tag' bsSize='xsmall' bsStyle={selected ? 'primary' : 'default'} onClick={onClick.bind(null, id)}>
        <p className='tag__name'>{tagName}</p>
        <p className='tag__id'>{id}</p>
      </Button>
    );
  }
}

Tag.propTypes = {
  tagName: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string,
  selected: PropTypes.bool
};

Tag.defaultProps = {
  onClick: () => {}
};

export default Tag;
