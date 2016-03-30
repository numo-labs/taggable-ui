import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import './styles.css';

class Tag extends Component {
  render () {
    const { tagName, onClick, id } = this.props;
    return (
      <Button className='tag' bsSize='small' onClick={onClick.bind(null, id)}>
        <h5>{tagName}</h5>
        <p>{id}</p>
      </Button>
    );
  }
}

Tag.propTypes = {
  tagName: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string
};

export default Tag;
