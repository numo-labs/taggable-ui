import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import SearchBar from '../../src/components/search-bar/';

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
