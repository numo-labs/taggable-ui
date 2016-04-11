import { connect } from 'react-redux';
import TaggableUI from '../components/taggable-ui';
import * as Actions from '../actions/tag.js';
function mapStateToProps (state) {
  const {
    taggable: {
      searchResults,
      tagInView,
      linkedTags,
      configurationSaved,
      inSearch,
      parentTagSearchResults,
      inParentTagSearch,
      tagType,
      parentTagTagType
     }
   } = state;

  return {
    tagInView,
    searchResults,
    linkedTags,
    configurationSaved,
    inSearch,
    parentTagSearchResults,
    inParentTagSearch,
    tagType,
    parentTagTagType
  };
}

export default connect(mapStateToProps, Actions)(TaggableUI);
