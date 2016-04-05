'use strict';
import _ from 'lodash';
import {
  SET_SELECTED_TAG_FROM_SEARCH,
  SET_SEARCH_STRING,
  SET_SEARCH_RESULTS
} from '../constants/action-types.js';

export const initialState = {
  searchResults: {
    total: 0,
    items: []
  },
  linkedTags: [],
  tagInView: {},
  searchString: ''
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
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.items
      };
    default:
      return state;
  }
}
