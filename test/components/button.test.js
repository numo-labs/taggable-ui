import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { SymbolButton, AddTagButton } from '../../src/components/button';

describe('Buttons', function () {
  describe('<SymbolButton />', function () {
    const wrapper = shallow(<SymbolButton />);
    const children = wrapper.children().nodes;
    it('should render our SymbolButton component', function (done) {
      expect(children).to.have.length(1);
      done();
    });
    it('should render <div>{symbol}</div> as the first child', function (done) {
      const firstChild = children[0].type;
      const symbol = wrapper.find('div').node.type;
      expect(firstChild).to.deep.equal(symbol);
      done();
    });
  });
  describe('<AddTagButton />', function () {
    const wrapper = shallow(<AddTagButton text='test'/>);
    it('should render our AddTagButton component with the text passed in the `text` prop', function (done) {
      expect(wrapper.children().nodes[0]).to.equal('test');
      done();
    });
  });
});
