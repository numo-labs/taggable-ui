import React, { Component, PropTypes } from 'react';
import Form from 'react-jsonschema-form';
import Schema from './schema.json';
import './styles.css';

export default class ContentEditor extends Component {

  formatFormData (data) {
    return {
      ...data,
      markets: data.markets ? data.markets : [],
      content: data.content ? data.content : [],
      active: data.active ? data.active : true,
      description: data.description ? data.description : ''
    };
  }
  onSubmit (data) {
    const tagDoc = this.formatFormData(data.formData);
    if (data.errors.length === 0) {
      this.props.onSubmit(tagDoc);
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
