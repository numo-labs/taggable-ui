import React, { PropTypes, Component } from 'react';
import { Provider } from 'react-redux';

// container
import App from './app.js';

class Root extends Component {

  render () {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
