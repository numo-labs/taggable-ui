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
export function setSearchString (text) {
  return { type: types.SET_SEARCH_STRING, text };
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

export function busySearching () {
  return { type: types.BUSY_SEARCHING };
}

/*
* Function to save the retrieved results from graphql to redux store
*/

export function setSearchResults (searchResults) {
  return { type: types.SET_SEARCH_RESULTS, searchResults };
}

/*
* Function to set the queryType and tagType of the query
*/

export function setTagTypeAndQueryType (queryType, tagType) {
  return { type: types.SET_TAG_TYPE_AND_QUERY_TYPE, tagType, queryType };
}
/*
*  Function to retrieve tags based on a searchString, queryType and tagType
*/

export function fetchTags (searchString, start, size) {
  return (dispatch, getState) => {
    dispatch(busySearching());
    const { taggable: { queryType, tagType } } = getState();
    return graphqlService.query(QUERY_SEARCH_TAGS, {id: searchString, queryType, tagType, start, size})
      .then(json => {
        const searchResults = json.data.taggable.items ? json.data.taggable : {total: 0, items: []};
        return dispatch(setSearchResults(searchResults));
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

/*
* Function that will add a specific value
*/

export function addValue (index, value) {
  return { type: types.ADD_VALUE, index, value };
}

/*
* Function that will add a key value pair to the metadata array
*/

export function addKeyValuePair (key, value) {
  return { type: types.ADD_KEY_VALUE_PAIR, key, value };
}

/*
* Function that will set the newKey string
*/

export function setNewKeyString (keyString) {
  return { type: types.SET_NEW_KEY_STRING, keyString };
}

/*
* Function that will set the newValue string
*/

export function setNewValueString (valueString) {
  return { type: types.SET_NEW_VALUE_STRING, valueString };
}

/*
* Function that will empty the tagInView properties
*/

export function emptyTagInView () {
  return { type: types.EMPTY_TAG_IN_VIEW };
}

/*
* Function that will update the displayName
*/

export function updateDisplayName (displayName) {
  return { type: types.UPDATE_DISPLAYNAME, displayName };
}

/*
* Function that will update the tag id
*/

export function updateId (id) {
  return { type: types.UPDATE_ID, id };
}

/*
* Function that will update the tag latitude
*/

export function updateLatitude (latitude) {
  return { type: types.UPDATE_LATITUDE, latitude };
}

/*
* Function that will update the tag longitude
*/

export function updateLongitude (longitude) {
  return { type: types.UPDATE_LONGITUDE, longitude };
}
