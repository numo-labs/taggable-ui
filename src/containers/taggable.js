import { connect } from 'react-redux';
import TaggableUI from '../components/taggable-ui';

function mapStateToProps (state) {
  const { taggable: { searchResults, selectedTag } } = state;
  return {
    searchResults,
    selectedTag
  };
}

export default connect(mapStateToProps)(TaggableUI);
