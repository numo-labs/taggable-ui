import { connect } from 'react-redux';
import TaggableUI from '../components/taggable-ui';
import * as Actions from '../actions/tag.js';
function mapStateToProps (state) {
  const {
    taggable: {
      searchResults,
      tagInView,
      searchString,
      linkedTags,
      queryType,
      tagType,
      configurationSaved,
      inSearch,
      newKey,
      newValue,
      createMode
     }
   } = state;

  return {
    tagInView,
    searchResults,
    searchString,
    linkedTags,
    queryType,
    tagType,
    configurationSaved,
    inSearch,
    newKey,
    newValue,
    createMode
  };
}

export default connect(mapStateToProps, Actions)(TaggableUI);
