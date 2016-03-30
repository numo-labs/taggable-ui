'use strict';

const initialState = {
  searchResults: [
    {
      tagId: 'geography:geonames.3374084',
      tagType: 'geography',
      source: 'geonames',
      active: true
    },
    {
      tagId: 'hotel:NE.wvHotelPartId.12345',
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
  selectedTag: {
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
        tagId: 'hotel:NE.wvHotelPartId.12345',
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
  }
};

export default function taggable (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
