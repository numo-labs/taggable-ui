export const mockTags = [
  {
    _id: 'marketing:NE.wvHotelPartId.54321',
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
  },
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
  },
  {
    _id: 'hotel:NE.wvHotelPartId.678910',
    displayName: 'All Seasons Resort Europa',
    tags: [],
    content: []
  },
  {
    _id: 'geography:geonames.3374084',
    displayName: 'Barbados',
    tags: [
      {
        tagId: 'marketing:tile.romantic_beaches',
        tagType: 'marketing',
        source: 'user',
        active: true
      }
    ],
    metadata: [
      {
        key: 'label:en',
        values: ['Barbados']
      },
      {
        key: 'geonames:feature',
        values: ['ADM1']
      },
      {
        key: 'label:fr',
        values: ['Barbade']
      },
      {
        key: 'label:iso',
        values: ['BB']
      },
      {
        key: 'search:en',
        values: ['Barbados']
      },
      {
        key: 'search:fr',
        values: ['Barbade', 'Barbados'] // Can search for both when in language FR context
      }
    ]
  },
  {
    _id: 'marketing:tile.romantic_beaches',
    displayName: 'Romantic Beaches',
    tags: [],
    metadata: [
      {
        key: 'search:en',
        values: ['Romantic Beaches']
      },
      {
        key: 'label:en',
        values: ['Romantic Beaches']
      }
    ]
  }
];
