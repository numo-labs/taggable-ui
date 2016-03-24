import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Tag from '../../src/components/tag';

describe('Components', function () {
  const wrapper = shallow(<Tag />);
  const children = wrapper.children().nodes;
  describe('<Tag />', function () {
    it('should render our Tag component', function (done) {
      expect(children).to.have.length(1);
    });
  });
});
