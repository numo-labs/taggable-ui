import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import FilterButtons from '../../src/components/filter-buttons';

describe('Component', function () {
  const wrapper = shallow(<FilterButtons />);
  const children = wrapper.children().nodes;
  describe('<FilterButtons />', function () {
    it('should render our FilterButtons component', function (done) {
      expect(children).to.have.length(6);
      done();
    });
  });
});
