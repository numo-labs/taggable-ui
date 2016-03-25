'use strict';

const initialState = {
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
  ]
};

export default function taggable (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
