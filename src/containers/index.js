import React, { PropTypes, Component } from 'react';
import { Provider } from 'react-redux';

// container
import Taggable from './taggable.js';

class Root extends Component {

  render () {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Taggable />
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
