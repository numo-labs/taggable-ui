import React, { Component, PropTypes } from 'react';
import Form from 'react-jsonschema-form';
import Schema from './schema.json';
import { Button } from 'react-bootstrap';
import './styles.css';

export default class ContentEditor extends Component {

  formatFormData (data) {
    return {
      ...data,
      markets: data.markets ? data.markets : [],
      content: data.content ? data.content : [],
      active: typeof data.active === 'boolean' ? data.active : true,
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
    const { tagDoc, readOnly } = this.props;
    return (
      <Form
        schema={Schema}
        formData={tagDoc}
        onSubmit={this.onSubmit.bind(this)} // onSubmit handler is on the form level as the form data is passed into the function by the form component
      >
        <Button
          type='submit'
          disabled={readOnly}
        >
          Submit
        </Button>
      </Form>
    );
  }
}

ContentEditor.propTypes = {
  onSubmit: PropTypes.func,
  tagDoc: PropTypes.object,
  readOnly: PropTypes.bool
};
