'use strict';
import _ from 'lodash';
import {
  SET_SELECTED_TAG_FROM_SEARCH,
  SET_SEARCH_STRING,
  SET_SEARCH_RESULTS,
  SET_TAG_TYPE_AND_QUERY_TYPE,
  SAVE_CONFIGURATION,
  BUSY_SEARCHING,
  DELETE_VALUE,
  ADD_PARENT_TAG,
  REMOVE_PARENT_TAG
} from '../constants/action-types.js';

export const initialState = {
  searchResults: {
    total: 0,
    items: []
  },
  linkedTags: [],
  tagInView: {},
  searchString: '',
  tagType: null,
  queryType: 'QUERY_DISPLAYNAME',
  configurationSaved: true,
  inSearch: false,
  // state fpr parent search component inside the view pane
  parentTagSearchResults: {
    total: 0,
    items: []
  },
  parentTagSearchString: '',
  inParentTagSearch: false,
  parentTagTagType: null,
  parentTagQueryType: 'QUERY_DISPLAYNAME'
};

export default function taggable (state = initialState, action) {
  const tagInView = state.tagInView;
  const searchState = action.option === 'parent' ? 'inParentTagSearch' : 'inSearch';

  switch (action.type) {
    case SET_SELECTED_TAG_FROM_SEARCH:
      const item = _.find(state.searchResults.items, function (result) {
        return result._id === action.id;
      });
      return {
        ...state,
        tagInView: item
      };
    case SET_SEARCH_STRING:
      const searchStringState = action.option === 'parent' ? 'parentTagSearchString' : 'searchString';
      return {
        ...state,
        [searchStringState]: action.text
      };
    case BUSY_SEARCHING:
      return {
        ...state,
        [searchState]: true
      };
    case SET_SEARCH_RESULTS:
      const searchResultsState = action.option === 'parent' ? 'parentTagSearchResults' : 'searchResults';
      return {
        ...state,
        [searchResultsState]: action.searchResults,
        [searchState]: false
      };
    case SET_TAG_TYPE_AND_QUERY_TYPE:
      const tagTypeState = action.option === 'parent' ? 'parentTagTagType' : 'tagType';
      const queryTypeState = action.option === 'parent' ? 'parentTagQueryType' : 'queryType';
      return {
        ...state,
        [queryTypeState]: action.queryType,
        [tagTypeState]: action.tagType
      };
    case ADD_PARENT_TAG:
      const newParentTag = {
        tagId: action.id,
        source: 'taggable_ui',
        active: true,
        inherited: false
      };
      const tags = [...tagInView.tags, newParentTag];
      return {
        ...state,
        tagInView: {
          ...state.tagInView,
          tags: _.uniqBy(tags, 'tagId') // prevent duplicate links
        }
      };
    case REMOVE_PARENT_TAG:
      return {
        ...state,
        tagInView: {
          ...state.tagInView,
          tags: state.tagInView.tags.filter(tag => tag.tagId !== action.id)
        }
      };
    case SAVE_CONFIGURATION:
      return {
        ...state,
        configurationSaved: true
      };
    case DELETE_VALUE:
      const metadataCopy = state.tagInView.metadata;
      const contentCopy = state.tagInView.metadata[action.metaIndex];
      const newValues = contentCopy.values;
      newValues.splice(action.index, 1);
      metadataCopy.splice(action.metaIndex, 1, {...contentCopy, values: newValues});
      return {
        ...state,
        configurationSaved: false,
        tagInView: {
          ...state.tagInView,
          metadata: metadataCopy
        }
      };
    default:
      return state;
  }
}
