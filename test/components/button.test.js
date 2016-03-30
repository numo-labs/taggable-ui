// import React from 'react';
// import { expect } from 'chai';
// import { shallow } from 'enzyme';
// import { SymbolButton } from '../../src/components/button';
//
// describe('Components', function () {
//   const wrapper = shallow(<SymbolButton />);
//   const children = wrapper.children().nodes;
//   describe('<SymbolButton />', function () {
//     it('should render our SymbolButton component', function (done) {
//       expect(children).to.have.length(1);
//       done();
//     });
//     it('should render <div>{symbol}</div> as the first child', function (done) {
//       const firstChild = children[0].type;
//       const symbol = wrapper.find('div').node.type;
//       expect(firstChild).to.deep.equal(symbol);
//       done();
//     });
//     it('should have props for symbol and onHandleClick', function (done) {
//       expect(wrapper.props().symbol).to.be.defined;
//       expect(wrapper.props().onHandleClick).to.be.defined;
//       done();
//     });
//   });
// });
