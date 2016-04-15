import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import SavingNotificationModal from '../../src/components/saving-notification-modal';

describe('Component', function () {
  describe('<SavingNotificationModal />', function () {
    const wrapper = shallow(<SavingNotificationModal />);
    const children = wrapper.children().nodes;
    const modalChildren = wrapper.find('Modal').children().nodes;
    it('should render the Modal component', function (done) {
      expect(children).to.have.length(1);
      done();
    });
    it('should render the Modal as the first child', function (done) {
      const firstChild = children[0].type;
      const modal = wrapper.find('Modal').node.type;
      expect(firstChild).to.equal(modal);
      done();
    });
    it('should render the ModalHeader as the first child of the Modal', function (done) {
      const modalFirstChild = modalChildren[0].type;
      const header = wrapper.find('ModalHeader').node.type;
      expect(modalFirstChild).to.equal(header);
      done();
    });
    it('should render the ModalBody as the second child of the Modal', function (done) {
      const modalSecondChild = modalChildren[1].type;
      const body = wrapper.find('ModalBody').node.type;
      expect(modalSecondChild).to.equal(body);
      done();
    });
    it('should render the ModalFooter as the third child of the Modal', function (done) {
      const modalThirdChild = modalChildren[2].type;
      const footer = wrapper.find('ModalFooter').node.type;
      expect(modalThirdChild).to.equal(footer);
      done();
    });
  });
});
