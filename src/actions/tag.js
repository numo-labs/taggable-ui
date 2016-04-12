import * as types from '../constants/action-types.js';
import { QUERY_SEARCH_TAGS, MUTATION_CREATE_TAG } from '../constants/queries.js';

import * as graphqlService from '../services/graphql.js';

/*
* onSubmit function for the search input component
*/
export function search () {
  return { type: types.SEARCH };
}

/**
* onChangeText function for the search input component
* @param {String} - the search string
* @param {String} - option is either 'tag' or 'parent'. This corresponds to the
* search field in either the search pane (search for a 'tag'), or the view-pane
* (search for a 'parent' tag)
*/
export function setSearchString (text, option) {
  return { type: types.SET_SEARCH_STRING, text, option };
}

/**
* onClick function for the tags in the search results
* @param {String} - id of the selected tag
*/
export function setSelectedTagFromSearch (id) {
  return { type: types.SET_SELECTED_TAG_FROM_SEARCH, id };
}

/**
* Function to set the inSearch state to true to show a loading spinner while
* results are being fetched
* @param {String} - id of the selected tag
*/

export function busySearching (option) {
  return { type: types.BUSY_SEARCHING, option };
}

/**
* Function to add a parent linked tag to the currently selected tag
* @param {String} - id of the selected tag
*/

export function addParentTag (id) {
  return { type: types.ADD_PARENT_TAG, id };
}

/**
* Function to remove a parent tag of the currently selected tag
* @param {String} - id of the selected tag
* @param {String} - option is either 'tag' or 'parent'. This corresponds to the
* search field in either the search pane (search for a 'tag'), or the view-pane
* (search for a 'parent' tag)
*/

export function removeParentTag (id) {
  return { type: types.REMOVE_PARENT_TAG, id };
}

/**
* Function to save the retrieved results from graphql to redux store
* @param {String} - id of the selected tag
*/

export function setSearchResults (searchResults, option) {
  return { type: types.SET_SEARCH_RESULTS, searchResults, option };
}

/**
* Function to set the queryType and tagType of the query
* @param {String} - queryType e.g. QUERY_ID, QUERY_DISPLAYNAME
* @param (String) - tagType e.g. 'GEO', 'MARKETING', 'AMENITY'
* @param {String} - option is either 'tag' or 'parent'. This corresponds to the
* search field in either the search pane (search for a 'tag'), or the view-pane
* (search for a 'parent' tag)
*/

export function setTagTypeAndQueryType (queryType, tagType, option) {
  return { type: types.SET_TAG_TYPE_AND_QUERY_TYPE, tagType, queryType, option };
}

/**
* Function to retrieve tags by launching a graphql query
* @param {String} - start - offset index for pagination
* @param (String) - size -  number of tags to retrieve
* @param {String} - option - either 'tag' or 'parent'. This corresponds to the
* search field in either the search pane (search for a 'tag'), or the view-pane
* (search for a 'parent' tag)
*/

export function fetchTags (start, size, option) {
  return (dispatch, getState) => {
    dispatch(busySearching(option));
    const state = getState().taggable;
    const { tag: { queryType, tagType } } = state;
    const searchString = state[option].searchString;
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
* Function that will remove a specific value of a key in the metadata array
*/

export function deleteValue (metaIndex, index) {
  return { type: types.DELETE_VALUE, metaIndex, index };
}
