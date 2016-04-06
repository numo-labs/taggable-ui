import * as types from '../constants/action-types.js';
import { QUERY_SEARCH_TAGS } from '../constants/queries.js';

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
* Function to save the retrieved results from graphql to redux store
*/

export function setSearchResults (items) {
  return { type: types.SET_SEARCH_RESULTS, items };
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

export function fetchTags (searchString, queryType, tagType, start, size) {
  return (dispatch, getState) => {
    console.log('%%%%%%%%%', searchString, queryType, tagType);
    const { taggable: { queryType, tagType } } = getState();
    return graphqlService.query(QUERY_SEARCH_TAGS, {id: searchString, queryType, tagType, start, size})
      .then(json => {
        const items = json.data.taggable || [];
        return dispatch(setSearchResults(items));
      });
  };
}
