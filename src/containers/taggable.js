import { connect } from 'react-redux';
import TaggableUI from '../components/taggable-ui';
import * as Actions from '../actions/tag.js';
function mapStateToProps (state) {
  const {
    taggable: {
      searchResults,
      tagInView,
      selectedTagFromSearch,
      linkedTags,
      searchTerm
     }
   } = state;

  return {
    tagInView,
    selectedTagFromSearch,
    searchResults,
    linkedTags,
    searchTerm
  };
}

export default connect(mapStateToProps, Actions)(TaggableUI);
