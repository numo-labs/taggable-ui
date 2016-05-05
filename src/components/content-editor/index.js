import React, { Component, PropTypes } from 'react';
import Form from 'react-json-editor';
import Schema from './schema.json';
import './styles.css';

export default class ContentEditor extends Component {

  onSubmit (data, buttonValue, errors) {
    const error = Object.keys(errors).length > 0;
    /*eslint-disable no-undef */
    if (error) {
      alert('Errors: ', JSON.stringify(errors));
    }
    /* eslint-enable no-undef */
    console.log('errors', errors);
    if (buttonValue === 'Submit' && !error) {
      this.props.onSubmit(data);
    }
  }

  render () {
    const { tagDoc } = this.props;
    return (
      <Form
        schema={Schema}
        onSubmit={this.onSubmit.bind(this)}
        values={tagDoc}
      />
    );
  }
}

ContentEditor.propTypes = {
  onSubmit: PropTypes.func,
  tagDoc: PropTypes.object
};
