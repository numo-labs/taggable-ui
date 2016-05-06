import React, { Component, PropTypes } from 'react';
import Form from 'react-jsonschema-form';
import Schema from './schema.json';
import './styles.css';

export default class ContentEditor extends Component {

  onSubmit (data) {
    console.log('data', data.formData);

    if (data.errors.length === 0) {
      this.props.onSubmit(data.formData);
    }
  }

  render () {
    const { tagDoc } = this.props;
    return (
        <Form
          schema={Schema}
          onSubmit={this.onSubmit.bind(this)}
          formData={tagDoc}
        />

    );
  }
}

ContentEditor.propTypes = {
  onSubmit: PropTypes.func,
  tagDoc: PropTypes.object
};
