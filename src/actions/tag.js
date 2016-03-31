import * as types from '../constants/action-types.js';
import { QUERY_SEARCH_TAGS, SET_SEARCH_RESULTS } from '../constants/queries.js';

import * as graphqlService from '../services/graphql.js';

export function search () {
  return { type: types.SEARCH };
}

export function searchLinkedTagDocument (tagID) {
  return (dispatch) => {
    dispatch(setSearchTerm(tagID));
    return dispatch(setSelectedTagFromSearch(tagID));
  };
}

export function setSearchTerm (text) {
  return { type: types.SET_SEARCH_TERM, text };
}

export function setSelectedTagFromSearch (tagID) {
  return { type: types.SET_SELECTED_TAG_FROM_SEARCH, tagID };
}

export function setSearchResults (tags) {
  return { type: SET_SEARCH_RESULTS, tags };
}

export function fetchTags (searchTerm) {
  return (dispatch) => {
    return graphqlService.query(QUERY_SEARCH_TAGS, {searchTerm})
      .then(json => {
        const tags = json.data.taggable;
        return dispatch(setSearchResults(tags));
      });
  };
}
