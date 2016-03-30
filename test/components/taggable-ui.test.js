import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import TaggableUI from '../../src/components/taggable-ui';

const props = {
  searchResults: [],
  selectedTag: {
    metadata: [],
    id: '',
    displayName: ''
  }
};
describe('Component', function () {
  describe('<TaggableUI />', function () {
    const wrapper = shallow(<TaggableUI {...props} />);
    const children = wrapper.children().nodes;
    it('should render our TaggableUI component', function (done) {
      expect(children).to.have.length(2);
      done();
    });
    it('should render a <PageHeader /> as the first child', function (done) {
      const firstChild = children[0].type;
      const pageHeader = wrapper.find('PageHeader').node.type;
      expect(firstChild).to.deep.equal(pageHeader);
      done();
    });
    it('should render a <Row /> as the second child', function (done) {
      const secondChild = children[1].type;
      const row = wrapper.find('Row').node.type;
      expect(secondChild).to.deep.equal(row);
      done();
    });
    it('should render three <Columns /> within the Row', function (done) {
      const rowChildren = wrapper.find('Row').children().nodes;
      const allColumnChildren = wrapper.find('Row').children().every('Col');
      expect(rowChildren).to.have.length(3);
      expect(allColumnChildren).to.equal(true);
      done();
    });
    it('should have props for searchResults and selectedTag', function (done) {
      expect(wrapper.props().searchResults).to.be.defined;
      expect(wrapper.props().selectedTag).to.be.defined;
      done();
    });
  });
});
