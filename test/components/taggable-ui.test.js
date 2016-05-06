import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import TaggableUI from '../../src/components/taggable-ui';

const props = {
  searchResults: {
    total: 0,
    items: []
  },
  tagInView: {},
  linkedTags: [],
  search: () => {},
  setTagInView: () => {},
  setSelectedTagFromSearch: () => {},
  setSearchTerm: () => {},
  selectedTagFromSearch: {},
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
      expect(children).to.have.length(3);
      done();
    });
    it('should render navbar as a <div/> with class .navi', function (done) {
      const nav = wrapper.find('.navi');
      expect(nav).to.have.length(1);
      done();
    });
    it('should render a <Grid /> as the third child', function (done) {
      const secondChild = children[2].type;
      const grid = wrapper.find('Grid').node.type;
      expect(secondChild).to.deep.equal(grid);
      done();
    });
  });
});
