import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import './styles.css';

class Tag extends Component {
  render () {
    const { tagName, onClick, id } = this.props;
    return (
      <Button className='tag' bsSize='xsmall' onClick={onClick.bind(null, id)}>
        <p className='tag__name'>{tagName}</p>
        <p className='tag__id'>{id}</p>
      </Button>
    );
  }
}

Tag.propTypes = {
  tagName: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string
};

Tag.defaultProps = {
  onClick: () => {}
};

export default Tag;
