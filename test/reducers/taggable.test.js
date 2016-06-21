'use strict';
import taggable, { initialState } from '../../src/reducers/taggable.js';
import { expect } from 'chai';
import {
  SET_SELECTED_TAG_FROM_SEARCH,
  SET_SEARCH_STRING,
  CLEAN_SEARCH_PANE,
  BUSY_SEARCHING,
  SET_SEARCH_RESULTS,
  SET_TAG_TYPE_AND_QUERY_TYPE,
  LOG_OUT,
  SAVE_PERMISSIONS,
  LOGIN_ERROR
} from '../../src/constants/action-types.js';

const mockHotelSearchResults = {
  total: 2,
  items: [
    {
      _id: 'hotel:NE.wvHotelPartId.12345',
      displayName: 'All Seasons',
      tags: [
        {
          tagId: 'geography:geonames.3374084',
          tagType: 'geography',
          source: 'geonames',
          active: true
        },
        {
          tagId: 'hotel:NE.wvHotelPartId.678910',
          tagType: 'hotel',
          source: 'master_hotel_mapping',
          active: true
        },
        {
          tagId: 'marketing:tile.romantic_beaches',
          tagType: 'marketing',
          source: 'inherited:geography:geonames.3374084',
          active: true
        }
      ],
      metadata: [
        {
          key: 'meta:location',
          values: ['13.1777', '-59.63560']
        },
        {
          key: 'search:en',
          values: ['All Seasons Resort Europe']
        },
        {
          key: 'search:fr',
          values: ['All Seasons Resort en Europe', 'All Seasons Resort Europe'] // Can search for both when in language FR context
        },
        {
          key: 'label:en',
          values: ['All Seasons Resort Europa']
        }
      ]
    },
    {
      _id: 'hotel:NE.wvHotelPartId.678910',
      displayName: 'All Seasons Resort Europa',
      tags: [],
      content: []
    }
  ]
};

describe('Reducers: Taggable', () => {
  it('action:unknown -> Returns the initial state', (done) => {
    const state = taggable(undefined, {type: 'test'});
    expect(state).to.deep.equal(initialState);
    done();
  });
  it('action:SET_SEARCH_STRING -> sets the searchString set inside the tag object when action.option = "tag"', (done) => {
    const state = taggable(undefined, {type: SET_SEARCH_STRING, text: 'hotel', option: 'tag'});
    expect(state).to.deep.equal({...initialState, tag: {...initialState.tag, searchString: 'hotel'}});
    done();
  });
  it('action:SET_SEARCH_STRING -> sets the searchString set inside the parent object when action.option = "parent"', (done) => {
    const state = taggable(undefined, {type: SET_SEARCH_STRING, text: 'hotel', option: 'parent'});
    expect(state).to.deep.equal({...initialState, parent: {...initialState.parent, searchString: 'hotel'}});
    done();
  });
  it('action:BUSY_SEARCHING -> sets inSearch to true inside tag object when action.option = "tag"', (done) => {
    const state = taggable(undefined, {type: BUSY_SEARCHING, option: 'tag'});
    expect(state).to.deep.equal({...initialState, tag: {...initialState.tag, inSearch: true}});
    done();
  });
  it('action:BUSY_SEARCHING -> sets inSearch to true inside parent object when action.option = "parent"', (done) => {
    const state = taggable(undefined, {type: BUSY_SEARCHING, option: 'parent'});
    expect(state).to.deep.equal({...initialState, parent: {...initialState.parent, inSearch: true}});
    done();
  });
  it('action:SET_SEARCH_RESULTS -> sets inSearch and searchResults inside parent object when action.option = "parent"', (done) => {
    const results = {total: 0, items: []};
    const state = taggable(undefined, {type: SET_SEARCH_RESULTS, option: 'parent', searchResults: results});
    expect(state).to.deep.equal({...initialState, parent: {...initialState.parent, inSearch: false, searchResults: results}});
    done();
  });
  it('action:SET_SEARCH_RESULTS -> sets inSearch and searchResults inside tag object when action.option = "tag"', (done) => {
    const results = {total: 0, items: []};
    const state = taggable(undefined, {type: SET_SEARCH_RESULTS, option: 'tag', searchResults: results});
    expect(state).to.deep.equal({...initialState, tag: {...initialState.tag, inSearch: false, searchResults: results}});
    done();
  });
  it('action:SET_TAG_TYPE_AND_QUERY_TYPE -> sets tagType and queryType inside tag object when action.option = "tag"', (done) => {
    const state = taggable(undefined, {type: SET_TAG_TYPE_AND_QUERY_TYPE, option: 'tag', tagType: 'GEO', queryType: 'QUERY_ID'});
    expect(state).to.deep.equal({...initialState, tag: {...initialState.tag, tagType: 'GEO', queryType: 'QUERY_ID'}});
    done();
  });
  it('action:SET_TAG_TYPE_AND_QUERY_TYPE -> sets tagType and queryType inside parent object when action.option = "parent"', (done) => {
    const state = taggable(undefined, {type: SET_TAG_TYPE_AND_QUERY_TYPE, option: 'parent', tagType: 'GEO', queryType: 'QUERY_ID'});
    expect(state).to.deep.equal({...initialState, parent: {...initialState.parent, tagType: 'GEO', queryType: 'QUERY_ID'}});
    done();
  });
  it('action:SET_SELECTED_TAG_FROM_SEARCH -> sets tagInView state to the selected tag object', (done) => {
    const state = taggable(undefined, {type: SET_SELECTED_TAG_FROM_SEARCH, tagID: 'hotel:NE.wvHotelPartId.678910'});
    const expectedState = {
      ...initialState,
      tagInView: mockHotelSearchResults[1],
      createMode: false
    };
    expect(state).to.deep.equal(expectedState);
    done();
  });
  it('action:SAVE_PERMISSIONS -> sets loggedIn to true and saves the token and readOnly permissions', (done) => {
    const action = {
      type: SAVE_PERMISSIONS,
      idToken: '1234',
      readOnly: true
    };
    const expectedState = {
      ...initialState,
      idToken: '1234',
      readOnly: true,
      loggedIn: true
    };
    const state = taggable(undefined, action);
    expect(state).to.deep.equal(expectedState);
    done();
  });
  it('action:LOG_OUT -> sets loggedIn to be false', (done) => {
    const action = {type: LOG_OUT};
    const state = taggable(undefined, action);
    const expectedState = {
      ...initialState,
      loggedIn: false
    };
    expect(state).to.deep.equal(expectedState);
    done();
  });
  it('action:LOGIN_ERROR -> sets loginError to true', (done) => {
    const action = {type: LOGIN_ERROR};
    const state = taggable(undefined, action);
    const expectedState = {
      ...initialState,
      loginError: true
    };
    expect(state).to.deep.equal(expectedState);
    done();
  });
  it('action:CLEAN_SEARCH_PANE -> returns new state without searchResults', (done) => {
    const state = taggable(undefined, {type: CLEAN_SEARCH_PANE});
    const expectedState = {
      ...initialState,
      tag: {
        ...initialState.tag,
        searchResults: {
          total: 0,
          items: []
        }
      }
    };
    expect(state).to.deep.equal(expectedState);
    done();
  });
});
