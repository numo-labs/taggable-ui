import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Tag from '../../src/components/tag';

describe('<Tag />', function () {
  const wrapper = shallow(<Tag />);
  const children = wrapper.children().nodes;
  it('should render our Tag component', function (done) {
    expect(children).to.have.length(1);
    done();
  });
  it('should render a <Button></Button> as the wrapper', function (done) {
    const wrapperType = wrapper.type();
    const button = wrapper.find('Button').node.type;
    expect(wrapperType).to.equal(button);
    done();
  });
  it('should render a <h5></h5> as the first child', function (done) {
    const firstChild = children[0].type;
    const h5 = wrapper.find('h5').node.type;
    expect(firstChild).to.deep.equal(h5);
    done();
  });
  it('should have props for tagName and onHandleClick', function (done) {
    expect(wrapper.props().tagName).to.be.defined;
    expect(wrapper.props().onHandleClick).to.be.defined;
    done();
  });
});
