import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ViewPane from '../../src/components/view-pane';
import * as mockTags from '../../src/utils/mockTags';
console.log(mockTags);
const metadata = [
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
];

describe('Component', function () {
  const wrapper = shallow(<ViewPane item={mockTags}/>);
  const children = wrapper.children().nodes;
  console.log('***CHILDREN***', children.length);
  describe('<ViewPane />', function () {
    it('should render our ViewPane component', function (done) {
      expect(children).to.have.length(2);
      done();
    });
  });
});
