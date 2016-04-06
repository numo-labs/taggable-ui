import React, { Component, PropTypes } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { filterButtonData } from '../../constants/filter-buttons';
import './styles.css';

class FilterButtons extends Component {
  handleOnClick () {
    this.props.onFilterButtonClick();
  }
  render () {
    return (
      <ButtonGroup className='filterButtons'>
      {filterButtonData.map(button => {
        return (
          <Button onClick={this.handleOnClick.bind(this)}>
            <i className={button.icon}></i>
          </Button>
        );
      })}
      </ButtonGroup>
    );
  }
}

FilterButtons.propTypes = {
  onFilterButtonClick: PropTypes.func
};

export default FilterButtons;
