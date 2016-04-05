'use strict';
import taggable, { initialState } from '../../src/reducers/taggable.js';
import { expect } from 'chai';
import {
  SET_SELECTED_TAG_FROM_SEARCH,
  SET_SEARCH_STRING
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
  it('action:SET_SEARCH_STRING -> returns a new state with the searchTerm and searchResults', (done) => {
    const state = taggable(undefined, {type: SET_SEARCH_STRING, text: 'hotel'});
    expect(state).to.deep.equal({...initialState, searchString: 'hotel'});
    done();
  });
  it('action:SET_SELECTED_TAG_FROM_SEARCH -> returns new state with a tag object set to tagInView and linkedTags', (done) => {
    const state = taggable(undefined, {type: SET_SELECTED_TAG_FROM_SEARCH, tagID: 'hotel:NE.wvHotelPartId.678910'});
    const expectedState = {
      ...initialState,
      tagInView: mockHotelSearchResults[1],
      linkedTags: []
    };
    expect(state).to.deep.equal(expectedState);
    done();
  });
});
