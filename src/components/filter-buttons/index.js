import React, { Component, PropTypes } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { filterButtonData } from '../../constants/filter-buttons';
import './styles.css';

class FilterButtons extends Component {
  render () {
    return (
      <ButtonGroup className='filterButtons'>
      {filterButtonData.map(button => {
        const selected = this.props.tagType === button.tagType ? 'primary' : 'default';
        return (
          <div key={button.tagType}>
            <Button bsStyle={selected} onClick={() => this.props.onFilterButtonClick(button.queryType, button.tagType)}>
              <i className={button.icon}></i>
            </Button>
          </div>
        );
      })}
      </ButtonGroup>
    );
  }
}

FilterButtons.propTypes = {
  onFilterButtonClick: PropTypes.func,
  tagType: PropTypes.string,
  queryType: PropTypes.string
};

export default FilterButtons;
