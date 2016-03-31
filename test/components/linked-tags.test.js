import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import LinkedTags from '../../src/components/linked-tags';

const props = {
  listItems: [],
  onTagClick: () => {},
  selectedTagId: ''
};

describe('Component', function () {
  describe('<LinkedTags />', function () {
    const wrapper = shallow(<LinkedTags {...props}/>);
    const children = wrapper.children().nodes;
    it('should render our LinkedTags component', function (done) {
      expect(children).to.have.length(3);
      done();
    });
    it('should render the <TagList /> as the first child', function (done) {
      const firstChild = children[0].type;
      const TagList = wrapper.find('TagList').node.type;
      expect(firstChild).to.deep.equal(TagList);
      done();
    });
    it('should render a <Button /> as the second child', function (done) {
      expect(wrapper.find('AddTagButton')).to.have.length(1);
      done();
    });
  });
});
