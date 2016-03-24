import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import LinkedTags from '../../src/components/linked-tags';

describe('Components', function () {
  const wrapper = shallow(<LinkedTags />);
  const children = wrapper.children().nodes;
  describe('<LinkedTags />', function () {
    it('should render our LinkedTags component', function (done) {
      expect(children).to.have.length(1);
      done();
    });
    it('should render our <LinkedTagsList /> as the first child', function (done) {
      const firstChild = children[0].type;
      const LinkedTagsList = wrapper.find('TagList').node.type;
      expect(firstChild).to.deep.equal(LinkedTagsList);
      done();
    });
  });
});
