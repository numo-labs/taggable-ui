import * as types from '../constants/action-types.js';
import { QUERY_SEARCH_TAGS, SET_SEARCH_RESULTS } from '../constants/queries.js';

import * as graphqlService from '../services/graphql.js';

/*
* onSubmit function for the search input component
*/
export function search () {
  return { type: types.SEARCH };
}

/*
* onClick function for the linked tags
*/
export function searchLinkedTagDocument (tagID) {
  return (dispatch) => {
    dispatch(setSearchTerm(tagID));
    return dispatch(setSelectedTagFromSearch(tagID));
  };
}

/*
* onChangeText function for the search input component
*/
export function setSearchTerm (text) {
  return { type: types.SET_SEARCH_TERM, text };
}

/*
* onClick function for the tags in the search results
*/
export function setSelectedTagFromSearch (tagID) {
  return { type: types.SET_SELECTED_TAG_FROM_SEARCH, tagID };
}

/*
* Function to save the retrieved results from graphql to redux store
*/

export function setSearchResults (tags) {
  return { type: SET_SEARCH_RESULTS, tags };
}

/*
*  Function to retrieve tags based on a searchTerm
*/

export function fetchTags (searchTerm) {
  return (dispatch) => {
    return graphqlService.query(QUERY_SEARCH_TAGS, {searchTerm})
      .then(json => {
        const tags = json.data.taggable;
        return dispatch(setSearchResults(tags));
      });
  };
}
