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
  it('should render our TagList component', function (done) {
    expect(children).to.have.length(numberOfTags);
    done();
  });
  it('should have props for listItems, onHandleTagClick and onHandleButtonClick', function (done) {
    expect(wrapper.props().listItems).to.be.defined;
    expect(wrapper.props().onHandleTagClick).to.be.defined;
    expect(wrapper.props().onHandleButtonClick).to.be.defined;
    done();
  });
});
