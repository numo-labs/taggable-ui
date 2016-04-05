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
  console.log('setSelectedTagFromSearch called');
  return { type: types.SET_SELECTED_TAG_FROM_SEARCH, id };
}

/*
* Function to save the retrieved results from graphql to redux store
*/

export function setSearchResults (items) {
  return { type: types.SET_SEARCH_RESULTS, items };
}

/*
*  Function to retrieve tags based on a searchTerm
*/

export function fetchTags (searchString, start, size) {
  console.log('fetchTags >>>>>>>', searchString, start, size);
  return (dispatch, state) => {
    console.log('STATE', state());
    return graphqlService.query(QUERY_SEARCH_TAGS, {id: searchString, start, size})
      .then(json => {
        const items = json.data.taggable || [];
        return dispatch(setSearchResults(items));
      });
  };
}
