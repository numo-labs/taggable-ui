import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Tag from '../../src/components/tag';

describe('Component', function () {
  describe('<Tag />', function () {
    const wrapper = shallow(<Tag />);
    const children = wrapper.children().nodes;
    it('should render our Tag component', function (done) {
      expect(children).to.have.length(2);
      done();
    });
    it('should render a <Button></Button> as the wrapper', function (done) {
      const wrapperType = wrapper.type();
      const button = wrapper.find('Button').node.type;
      expect(wrapperType).to.equal(button);
      done();
    });
    it('should render two <p></p> tags as children', function (done) {
      const firstChild = children[0].type;
      const secondChild = children[1].type;
      const p = wrapper.find('p');
      const pType = p.node.type;
      expect(p).to.have.length(2);
      expect(firstChild).to.deep.equal(pType);
      expect(secondChild).to.deep.equal(pType);
      done();
    });
  });
});
