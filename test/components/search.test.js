import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import SearchBar from '../../src/components/search/';

describe('Search Panel', () => {
  it('Renders an input tag', (done) => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.find('input').length).to.equal(1);
    done();
  });
});
