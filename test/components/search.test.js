import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import SearchBar from '../../src/components/search/';

describe('Search Panel', () => {
  it('Renders a form and an input tag', (done) => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.find('form').length).to.equal(1);
    expect(wrapper.find('input').length).to.equal(1);
    expect(wrapper.find('form').children().first().type()).to.equal('input');
    done();
  });
  // it('Calls the onSubmit function prop when the form is submitted', (done) => {
  //   const props = {
  //     onChange: () => console.log('called')
  //   };
  //   const wrapper = shallow(<SearchBar {...props}/>);
  //   // wrapper.find('input').simulate('keyDown', {key: 'Enter', keyCode: 13, which: 13});
  //   wrapper.find('input').simulate('change', {target: {value: 'My new value'}});
  //   expect(props.onSubmit.callCount).to.equal(1);
  //   done();
  // });
});
