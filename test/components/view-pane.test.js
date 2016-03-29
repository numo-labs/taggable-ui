import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ViewPane from '../../src/components/view-pane';

describe('Componens', function () {
  const wrapper = shallow(<ViewPane />);
  const children = wrapper.children().nodes;
  describe('<ViewPane />', function () {
    it('should render our ViewPane component', function (done) {
      expect(children).to.have.length(1);
      done();
    });
  });
});
