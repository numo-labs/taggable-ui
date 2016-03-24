import React from 'react';
import jsdom from 'mocha-jsdom';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import TaggableContainer from '../../src/containers/taggable';

describe('containers', function () {
  jsdom();
  const wrapper = shallow(<TaggableContainer />);
  const children = wrapper.children().nodes;
  describe('<TaggableContainer />', function () {
    it('should render our TaggableContainer', function (done) {
      expect(children).to.have.length(0);
      done();
    });
  });
});
