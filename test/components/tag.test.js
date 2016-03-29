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
    it('should render a <div></div> as the first child', function (done) {
      const firstChild = children[0].type;
      const div = wrapper.find('div').node.type;
      expect(firstChild).to.deep.equal(div);
      done();
    });
    it('should have props for tagName and onHandleClick', function (done) {
      expect(wrapper.props().tagName).to.be.defined;
      expect(wrapper.props().onHandleClick).to.be.defined;
      done();
    });
  });
});
