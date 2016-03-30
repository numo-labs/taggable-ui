import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import SearchBar from '../../src/components/search-bar/';

describe('Component', function () {
  describe('<SearchBar />', () => {
    const wrapper = shallow(<SearchBar />);
    const children = wrapper.children().nodes;
    it('should render the <SearchBar /> component', function (done) {
      expect(children).to.have.length(1);
      done();
    });
    it('should render a <form> with an <input>', function (done) {
      const input = wrapper.find('Input');
      const form = wrapper.find('form');
      expect(form.length).to.equal(1);
      expect(input.length).to.equal(1);
      expect(form.children().first().type()).to.equal(input.node.type);
      done();
    });
  });
});
