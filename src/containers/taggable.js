import { connect } from 'react-redux';
import TaggableUI from '../components/taggable-ui';
import * as Actions from '../actions/tag.js';
function mapStateToProps (state) {
  const {
    taggable: {
      tag: {
        searchResults,
        linkedTags,
        inSearch,
        tagType
      },
      parent: {
        searchResults: parentTagSearchResults,
        inSearch: inParentTagSearch,
        tagType: parentTagTagType
      },
      tagInView,
      configurationSaved
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
