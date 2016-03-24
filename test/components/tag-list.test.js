import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import TagList from '../../src/components/tag-list';

describe('Components', function () {
  const wrapper = shallow(<TagList />);
  const children = wrapper.children().nodes;
  describe('<TagsList />', function () {
    it('should render our LinkedTagsList component', function (done) {
      expect(children).to.have.length(1);
      done();
    });
  });
});
