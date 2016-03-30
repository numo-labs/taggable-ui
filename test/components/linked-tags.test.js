import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import LinkedTags from '../../src/components/linked-tags';

describe('Component', function () {
  describe('<LinkedTags />', function () {
    const wrapper = shallow(<LinkedTags />);
    const children = wrapper.children().nodes;
    it('should render our LinkedTags component', function (done) {
      expect(children).to.have.length(2);
      done();
    });
    it('should render the <TagList /> as the first child', function (done) {
      const firstChild = children[0].type;
      const TagList = wrapper.find('TagList').node.type;
      expect(firstChild).to.deep.equal(TagList);
      done();
    });
    it('should render a <Button /> as the second child', function (done) {
      const secondChild = children[1].type;
      const button = wrapper.find('AddTagButton').node.type;
      expect(secondChild).to.deep.equal(button);
      done();
    });
    it('should render a <SearchBar /> as the third child if the searchBarVisible state is true', function (done) {
      expect(wrapper.find('SearchBar')).to.have.length(0);
      wrapper.setState({searchBarVisible: true});
      expect(wrapper.find('SearchBar')).to.have.length(1);
      done();
    });
  });
});
