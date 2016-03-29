import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import LinkedTags from '../../src/components/linked-tags';

describe('Components', function () {
  const wrapper = shallow(<LinkedTags />);
  const children = wrapper.children().nodes;
  describe('<LinkedTags />', function () {
    it('should render our LinkedTags component', function (done) {
      expect(children).to.have.length(2);
      done();
    });
    it('should render our <TagList /> as the first child', function (done) {
      const firstChild = children[0].type;
      const TagList = wrapper.find('TagList').node.type;
      expect(firstChild).to.deep.equal(TagList);
      done();
    });
    it('should render our <SearchBar /> as the second child', function (done) {
      const secondChild = children[1].type;
      const SearchBar = wrapper.find('SearchBar').node.type;
      expect(secondChild).to.deep.equal(SearchBar);
      done();
    });
    it('should have props for listItems', function (done) {
      expect(wrapper.props().listItems).to.be.defined;
      done();
    });
  });
});
