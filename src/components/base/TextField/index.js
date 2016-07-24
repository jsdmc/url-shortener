import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import FieldError from '../FieldError';

class EnhancedTextField extends Component {

  handleOnChange = (e) => {
    const { input } = this.props;
    if (input.onChangeInterceptor) {
      input.onChangeInterceptor(e);
    }
    input.onChange(e);
  }

  render() {
    const { onChangeInterceptor, ...field } = this.props;
    const { input, ...rest } = field;
    return (
      <TextField
        errorText={field.error && field.touched && <FieldError field={field} />}
        {...input}
        onChange={this.handleOnChange}
        {...rest}
      />
    );
  }
}

EnhancedTextField.propTypes = {
  input: PropTypes.object,
  onChangeInterceptor: PropTypes.func
};

export default EnhancedTextField;
