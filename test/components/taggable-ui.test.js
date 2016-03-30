import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import TaggableUI from '../../src/components/taggable-ui';

describe('Components', function () {
  const wrapper = shallow(<TaggableUI />);
  const children = wrapper.children().nodes;
  describe('<TaggableUI />', function () {
    it('should render our TaggableUI component', function (done) {
      expect(children).to.have.length(2);
      done();
    });
    it('should render <PageHeader /> as the first child', function (done) {
      const firstChild = children[0].type;
      const pageHeader = wrapper.find('PageHeader').node.type;
      expect(firstChild).to.deep.equal(pageHeader);
      done();
    });
    it('should render <Row></Row> as the second child', function (done) {
      const secondChild = children[1].type;
      const row = wrapper.find('Row').node.type;
      expect(secondChild).to.deep.equal(row);
      done();
    });
    it('should have props for tags', function (done) {
      expect(wrapper.props().tags).to.be.defined;
      done();
    });
  });
});
