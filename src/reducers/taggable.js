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
  ADD_VALUE
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
  inSearch: false
};

export default function taggable (state = initialState, action) {
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
      return {
        ...state,
        searchString: action.text
      };
    case BUSY_SEARCHING:
      return {
        ...state,
        inSearch: true
      };
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.searchResults,
        inSearch: false
      };
    case SET_TAG_TYPE_AND_QUERY_TYPE:
      return {
        ...state,
        queryType: action.queryType,
        tagType: action.tagType
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
    case ADD_VALUE:
      const addMetadataCopy = state.tagInView.metadata;
      const addContentCopy = state.tagInView.metadata[action.index];
      const targetValuesArray = state.tagInView.metadata[action.index].values;
      const newValuesArray = [...targetValuesArray, action.value];
      addMetadataCopy.splice(action.metaIndex, 1, {...addContentCopy, values: newValuesArray});
      console.log('$$$$$$$$$$', addContentCopy);
      return {
        ...state,
        configurationSaved: false,
        tagInView: {
          ...state.tagInView,
          metadata: addMetadataCopy
        }
      };
    default:
      return state;
  }
}
