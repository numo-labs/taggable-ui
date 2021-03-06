import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ViewPane from '../../src/components/view-pane';
import * as mockTags from '../../src/utils/mockTags';

const props = {
  newKey: '',
  newValue: '',
  items: mockTags,
  item: {
    _id: 12345,
    displayName: '',
    location: {
      lat: '',
      lon: ''
    }
  }
};

describe('Component', function () {
  const wrapper = shallow(<ViewPane {...props}/>);
  const children = wrapper.children().nodes;
  describe('<ViewPane />', function () {
    it('should render our ViewPane component', function (done) {
      expect(children).to.have.length(1);
      done();
    });
  });
});
