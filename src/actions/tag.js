import * as types from '../constants/action-types.js';
import { QUERY_SEARCH_TAGS, MUTATION_CREATE_TAG } from '../constants/queries.js';

import * as graphqlService from '../services/graphql.js';

/*
* onSubmit function for the search input component
*/
export function search () {
  return { type: types.SEARCH };
}

/*
* onChangeText function for the search input component
*/
export function setSearchString (text, option) {
  return { type: types.SET_SEARCH_STRING, text, option };
}

/*
* onClick function for the tags in the search results
*/
export function setSelectedTagFromSearch (id) {
  return { type: types.SET_SELECTED_TAG_FROM_SEARCH, id };
}

/*
* Function to set the inSearch state to true to show a loading spinner while
* results are being fetched
*/

export function busySearching (option) {
  return { type: types.BUSY_SEARCHING, option };
}

/*
* Function to add a parent linked tag to the currently selected tag
*/

export function addParentTag (id) {
  return { type: types.ADD_PARENT_TAG, id };
}

/*
* Function to remove a parent linked tag to the currently selected tag
*/

export function removeParentTag (id) {
  return { type: types.REMOVE_PARENT_TAG, id };
}

/*
* Function to save the retrieved results from graphql to redux store
*/

export function setSearchResults (searchResults, option) {
  return { type: types.SET_SEARCH_RESULTS, searchResults, option };
}

/*
* Function to set the queryType and tagType of the query
*/

export function setTagTypeAndQueryType (queryType, tagType, option) {
  return { type: types.SET_TAG_TYPE_AND_QUERY_TYPE, tagType, queryType, option };
}
/*
*  Function to retrieve tags based on a searchString, queryType and tagType
*/

export function fetchTags (start, size, option) {
  return (dispatch, getState) => {
    dispatch(busySearching(option));
    const state = getState().taggable;
    const { queryType, tagType } = state;
    const searchString = option === 'parent' ? state.parentTagSearchString : state.searchString;
    console.log('searchString', searchString);
    return graphqlService.query(QUERY_SEARCH_TAGS, {id: searchString, queryType, tagType, start, size})
      .then(json => {
        console.log('tags json', json);
        const searchResults = json.data.taggable.items ? json.data.taggable : {total: 0, items: []};
        return dispatch(setSearchResults(searchResults, option));
      });
  };
}

/*
* Function that will save a new tag configuration
*/

export function saveNewConfig () {
  return (dispatch, getState) => {
    const { tagInView: { id, displayName, location, tags, metadata } } = getState();
    return graphqlService.query(MUTATION_CREATE_TAG, {id, displayName, location, tags, metadata})
      .then(dispatch(saveConfiguration()));
  };
}

/*
* Function that will display a 'configuration saved' message
*/

export function saveConfiguration () {
  return { type: types.SAVE_CONFIGURATION };
}

/*
* Function that will remove a specific value
*/

export function deleteValue (metaIndex, index) {
  return { type: types.DELETE_VALUE, metaIndex, index };
}
