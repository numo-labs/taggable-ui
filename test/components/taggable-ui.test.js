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
    it('should render <SearchBar /> as the first child', function (done) {
      const firstChild = children[0].type;
      const searchBar = wrapper.find('SearchBar').node.type;
      expect(firstChild).to.deep.equal(searchBar);
      done();
    });
    it('should render <LinkedTags /> as the second child', function (done) {
      const secondChild = children[1].type;
      const linkedTags = wrapper.find('LinkedTags').node.type;
      expect(secondChild).to.deep.equal(linkedTags);
      done();
    });
  });
});
