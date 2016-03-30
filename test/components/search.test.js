import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
// import sinon from 'sinon';

import SearchPane from '../../src/components/search-pane/';

describe('<SearchPane />', () => {
  const wrapper = shallow(<SearchPane />);
  const children = wrapper.children().nodes;
  it('should render the <SearchPane /> component with the correct number of children', function (done) {
    expect(children).to.have.length(4);
    done();
  });
  it('Renders <SearchBar> as the first child', (done) => {
    const firstChild = children[0].type;
    const searchBar = wrapper.find('SearchBar').node.type;
    expect(firstChild).to.deep.equal(searchBar);
    done();
  });
  it('Renders <Tags> as the second child', (done) => {
    const secondChild = children[1].type;
    const tags = wrapper.find('TagList').node.type;
    expect(secondChild).to.deep.equal(tags);
    done();
  });
  it('Renders a <Button> as the third child', (done) => {
    const thirdChild = children[2].type;
    const button = wrapper.find('AddTagButton').node.type;
    expect(thirdChild).to.deep.equal(button);
    done();
  });
  it('Renders a <Modal> as the fourth child', (done) => {
    const fourthChild = children[3].type;
    const modal = wrapper.find('CreateTagModal').node.type;
    expect(fourthChild).to.deep.equal(modal);
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

// expect(wrapper.find('form').length).to.equal(1);
// expect(wrapper.find('input').length).to.equal(1);
// expect(wrapper.find('form').children().first().type()).to.equal('input');
