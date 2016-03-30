import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import TagList from '../../src/components/tag-list';
const mockTags = [
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
];

describe('<TagList />', function () {
  const wrapper = shallow(<TagList listItems={mockTags}/>);
  const children = wrapper.children().nodes;
  const numberOfTags = mockTags.length;
  it('should render our TagList component with the correct number of Tag Components', function (done) {
    expect(children).to.have.length(numberOfTags);
    expect(wrapper.find('Tag')).to.have.length(numberOfTags);
    done();
  });
  it('should render a <Button> component with each Tag component if the withButtons props is not set (defaults to true)', function (done) {
    expect(wrapper.find('SymbolButton')).to.have.length(3);
    wrapper.setProps({withButtons: false});
    expect(wrapper.find('SymbolButton')).to.have.length(0);
    done();
  });
});
