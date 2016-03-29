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
      done();
    });
    it('should render <h4>{tagName}</h4> as the first child', function (done) {
      const firstChild = children[0].type;
      const tagName = wrapper.find('h4').node.type;
      expect(firstChild).to.deep.equal(tagName);
      done();
    });
    it('should have props for tagName and onHandleClick', function (done) {
      expect(wrapper.props().tagName).to.be.defined;
      expect(wrapper.props().onHandleClick).to.be.defined;
      done();
    });
  });
});
