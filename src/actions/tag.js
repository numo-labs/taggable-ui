import * as types from '../constants/action-types.js';

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
