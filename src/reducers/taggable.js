'use strict';

import {
  SEARCH,
  SET_TAG_IN_VIEW,
  SET_SELECTED_TAG_FROM_SEARCH,
  SET_SEARCH_TERM
} from '../constants/action-types.js';

import { filterTags, findLinkedTags } from '../utils/searchHelper.js';

const initialState = {
  searchResults: [],
  selectedTagFromSearch: {},
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
    case SET_TAG_IN_VIEW:
      return {
        ...state,
        tagInView: filterTags(action.tagID)[0]
      };
    case SET_SELECTED_TAG_FROM_SEARCH:
      const tag = filterTags(action.tagID)[0];
      return {
        ...state,
        selectedTagFromSearch: tag,
        tagInView: tag,
        linkedTags: findLinkedTags(tag.tags)
      };
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.text,
        searchResults: filterTags(action.text)
      };
    default:
      return state;
  }
}
