import React, { Component, PropTypes } from 'react';
import Tag from '../tag';
import { Pagination } from 'react-bootstrap';
import { SymbolButton as Button } from '../button';
import './styles.css';

class TagList extends Component {
  constructor (props) {
    super(props);
    if (props.pagination) {
      this.state = {
        activePage: 1
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
      pagination,
      symbol,
      handleButtonClick,
      withButtons
    } = this.props;
    const list = items.map(item => {
      return (
        <div key={item.id} className='tag__item'>
          <Tag key={item.id} id={item.id} displayName={item.displayName} selected={item.id === selectedTagId} onClick={onTagClick} />
            { withButtons && <Button className='redButton' onHandleClick={handleButtonClick} symbol={symbol} /> }
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
  onPaginationSelect: PropTypes.func,
  symbol: PropTypes.string,
  handleButtonClick: PropTypes.func,
  withButtons: PropTypes.bool
};

TagList.defaultProps = {
  items: []
};

export default TagList;
