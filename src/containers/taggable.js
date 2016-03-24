import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LinkedTags from '../components/linked-tags';

class Taggable extends Component {
  render () {
    const { tags } = this.props;
    return (
      <div>
        <LinkedTags listItems={tags} />
      </div>
    );
  }
}

Taggable.propTypes = {
  tags: PropTypes.array
};

function mapStateToProps (state) {
  console.log(state);
  const { tags: { tags } } = state;
  return {
    tags
  };
}

export default connect(mapStateToProps)(Taggable);
