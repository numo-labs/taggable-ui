import * as types from '../constants/action-types.js';
import { QUERY_SUGGEST_TAGS, QUERY_SEARCH_TAG } from '../constants/queries.js';
import { MUTATION_CREATE_TAG } from '../constants/mutations.js';

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
export function setSelectedTagFromSearch (tagDoc) {
  return { type: types.SET_SELECTED_TAG_FROM_SEARCH, tagDoc };
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
* @param (String) - tagType e.g. 'GEO', 'MARKETING', 'AMENITY'
* @param {String} - queryType e.g. QUERY_ID, QUERY_DISPLAYNAME
* @param {String} - option is either 'tag' or 'parent'. This corresponds to the
* search field in either the search pane (search for a 'tag'), or the view-pane
* (search for a 'parent' tag)
*/

export function setTagTypeAndQueryType (tagType, queryType, option) {
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
    // const { tag: { queryType, tagType } } = state;
    const searchString = state[option].searchString;
    return graphqlService.query(QUERY_SUGGEST_TAGS, {text: searchString, size})
      .then(json => {
        console.log('fetchTags json', json);
        const searchResults = json.data.taggable.suggest.items ? json.data.taggable.suggest : {total: 0, items: []};
        return dispatch(setSearchResults(searchResults, option));
      });
  };
}

export function fetchTagDoc (tagid) {
  console.log('id', tagid);
  return (dispatch) => {
    return graphqlService.query(QUERY_SEARCH_TAG, {tagid})
      .then(json => {
        console.log('fetchTagDoc, json', json);
        const tagDoc = json.data.taggable.search;
        const markets = JSON.parse(tagDoc.markets);
        const doc = {
          ...json.data.taggable.search,
          markets: formatMarketsToEdit(markets)
        };
        return dispatch(setSelectedTagFromSearch(doc));
      });
  };
}

function formatMarketsToSave (markets) {
  return markets.reduce((result, marketObj) => {
    return {
      ...result,
      [marketObj.market]: {
        [marketObj.language]: {
          label: marketObj.label,
          values: marketObj.values
        }
      }
    };
  }, {});
}

function formatMarketsToEdit (markets) {
  const marketArray = [];
  Object.keys(markets).forEach(market => {
    const languages = Object.keys(markets[market]);
    languages.forEach(language => {
      marketArray.push({
        market,
        language,
        label: markets[market][language].label,
        values: markets[market][language].values
      });
    });
  });
  return marketArray;
}

export function saveTagContent (tagDoc) {
  return (dispatch) => {
    dispatch(saveTagDoc(tagDoc));
    return dispatch(saveNewConfig());
  };
}

function saveTagDoc (tagDoc) {
  return { type: types.SAVE_TAG_CONTENT, tagDoc };
}

 // {"markets":[{"market":"dk","language":"da","label":"SPain","values":["Spainen","Spain"]}]}

/*
* Function that will save a new tag configuration
*/

export function saveNewConfig () {
  return (dispatch, getState) => {
    const { taggable: { tagInView: { _id: id, displayName, location, tags, metadata, markets } } } = getState();
    const variables = {id, displayName, location, tags, metadata, markets: JSON.stringify(formatMarketsToSave(markets))};
    console.log('tag update request', variables);
    return graphqlService.query(MUTATION_CREATE_TAG, variables)
      .then(json => {
        console.log('tag update response', json);
        dispatch(saveConfiguration());
      });
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
/**
 * Function that will clean the search results pane
 */

export function cleanSearchPane () {
  return { type: types.CLEAN_SEARCH_PANE };
}
