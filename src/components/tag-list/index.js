import React, { Component, PropTypes } from 'react';
import Tag from '../tag';
import { Pagination } from 'react-bootstrap';
import './styles.css';

class TagList extends Component {
  constructor (props) {
    super(props);
    if (props.pagination) {
      this.state = {
        activePage: props.pagination.activePage || 1
      };
    }
  }
  handleOnSelect (event, selectedEvent) {
    event.preventDefault();
    this.props.pagination.onSelect(selectedEvent.eventKey - 1);
    console.log('selectedEvent.key', typeof selectedEvent);
    this.setState({
      activePage: selectedEvent.eventKey
    });
  }
  renderWithPagination () {
    const {
      pagination: {
        numberOfItems,
        maxButtons,
        total
      }
    } = this.props;
    return (
      <div>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          items={numberOfItems}
          maxButtons={maxButtons}
          onSelect={this.handleOnSelect.bind(this)}
          activePage={this.state.activePage}
        />
        <div className='total'>{total}</div>
      </div>
          );
  }

  renderWithoutPagination () {
    return (
      <div></div>
    );
  }
  render () {
    const {
      items,
      onTagClick,
      selectedTagId,
      pagination
    } = this.props;
    const list = items.map(item => {
      return (
        <div key={item.id} className='tag__item'>
          <Tag key={item.id} id={item.id} displayName={item.displayName} selected={item.id === selectedTagId} onClick={onTagClick} />
        </div>
      );
    });
    return (
      <div>
        <div className='list scroll'>
          {list}
        </div>
        {pagination ? this.renderWithPagination() : this.renderWithoutPagination()}
      </div>
    );
  }
}

TagList.propTypes = {
  items: PropTypes.array,
  onTagClick: PropTypes.func,
  selectedTagId: PropTypes.string,
  pagination: PropTypes.object,
  onPaginationSelect: PropTypes.func
};

TagList.defaultProps = {
  items: []
};

export default TagList;
