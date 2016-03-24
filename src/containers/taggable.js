import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LinkedTags from '../components/linked-tags';

import SearchBar from '../components/search';

class Taggable extends Component {
  render () {
    const { tags } = this.props;
    return (
      <div>
        <LinkedTags listItems={tags} />
        <SearchBar />
      </div>
    );
  }
}

Taggable.propTypes = {
  tags: PropTypes.array
};

function mapStateToProps (state) {
  console.log(state);
  const { taggable: { tags } } = state;
  return {
    tags
  };
}

export default connect(mapStateToProps)(Taggable);
