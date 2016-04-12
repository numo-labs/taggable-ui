import React, { Component, PropTypes } from 'react';
import Tag from '../tag';
import { Pagination } from 'react-bootstrap';
import { SymbolButton as Button } from '../button';
import './styles.css';
import Spinner from '../spinner';
import _ from 'lodash';

class TagList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      noTagsFound: false,
      activePage: 1
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.inSearch && !nextProps.inSearch && nextProps.items.length === 0) {
      this.setState({noTagsFound: true});
    } else {
      this.setState({noTagsFound: false});
    }
  }

  handleOnSelect (event, selectedEvent) {
    event.preventDefault();
    this.props.pagination.onSelect(selectedEvent.eventKey - 1);
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

  renderTagList () {
    const {
      props: {
        items,
        onTagClick,
        selectedTagIds,
        symbol,
        handleButtonClick,
        withButtons
      },
      state: { noTagsFound }
    } = this;
    return noTagsFound ? <div>No matching tags found</div> : items.map(item => {
      return (
        <div key={item.id} className='tag__item'>
          <Tag
           key={item.id}
           id={item.id}
           displayName={item.displayName}
           selected={_.includes(selectedTagIds, item.id)}
           onClick={() => onTagClick(item.id)}
          />
          { withButtons &&
            <Button
              className='redButton'
              onClick={handleButtonClick.bind(null, item.id)}
              symbol={symbol}
            />
          }
        </div>
      );
    });
  }

  render () {
    const {
      props: {
        pagination,
        inSearch
      }
    } = this;
    return (
      <div>
        <div className='list scroll'>
          { inSearch ? <Spinner /> : this.renderTagList() }
        </div>
        {pagination ? this.renderWithPagination() : this.renderWithoutPagination()}
      </div>
    );
  }
}

TagList.propTypes = {
  items: PropTypes.array,
  onTagClick: PropTypes.func,
  selectedTagIds: PropTypes.array,
  pagination: PropTypes.object,
  onPaginationSelect: PropTypes.func,
  symbol: PropTypes.string,
  handleButtonClick: PropTypes.func,
  withButtons: PropTypes.bool,
  inSearch: PropTypes.bool
};

TagList.defaultProps = {
  items: []
};

export default TagList;
