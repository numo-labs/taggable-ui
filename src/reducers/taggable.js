'use strict';

import {
  SEARCH,
  SET_SELECTED_TAG_FROM_SEARCH,
  SET_SEARCH_TERM,
  SET_SEARCH_RESULTS
} from '../constants/action-types.js';

import { filterTags, findLinkedTags } from '../utils/searchHelper.js';

export const initialState = {
  searchResults: [],
  linkedTags: [],
  tagInView: {},
  searchTerm: ''
};

export default function taggable (state = initialState, action) {
  switch (action.type) {
    case SEARCH:
      return {
        ...initialState,
        searchResults: filterTags(state.searchTerm)
      };
    case SET_SELECTED_TAG_FROM_SEARCH:
      const tag = filterTags(action.tagID)[0];
      return {
        ...state,
        tagInView: tag,
        linkedTags: findLinkedTags(tag.tags)
      };
    case SET_SEARCH_TERM:
      return {
        ...initialState,
        searchTerm: action.text,
        searchResults: filterTags(action.text)
      };
    case SET_SEARCH_RESULTS:
      return {
        ...initialState,
        searchResults: action.tags
      };
    default:
      return state;
  }
}
