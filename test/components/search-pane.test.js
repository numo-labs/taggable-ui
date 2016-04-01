import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
// import sinon from 'sinon';

import SearchPane from '../../src/components/search-pane/';

describe('Component', function () {
  describe('<SearchPane />', () => {
    const wrapper = shallow(<SearchPane />);
    const children = wrapper.children().nodes;
    it('should render the <SearchPane /> component with the correct number of children', function (done) {
      expect(children).to.have.length(3);
      done();
    });
    it('Renders <SearchList /> as the first child', (done) => {
      const firstChild = children[0].type;
      const searchList = wrapper.find('SearchList').node.type;
      expect(firstChild).to.deep.equal(searchList);
      done();
    });
    it('Renders a <Button> as the second child', (done) => {
      const thirdChild = children[1].type;
      const button = wrapper.find('AddTagButton').node.type;
      expect(thirdChild).to.deep.equal(button);
      done();
    });
    it('Renders a <Modal> as the third child', (done) => {
      const fourthChild = children[2].type;
      const modal = wrapper.find('CreateTagModal').node.type;
      expect(fourthChild).to.deep.equal(modal);
      done();
    });
  });
});
