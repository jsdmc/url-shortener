import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import validationError from 'utils/validationError';

class EnhancedTextField extends Component {

  handleOnChange = (e) => {
    const { input } = this.props;
    if (input.onChangeInterceptor) {
      input.onChangeInterceptor(e);
    }
    input.onChange(e);
  }

  render() {
    const { onChangeInterceptor, ...props } = this.props;
    return (
      <TextField
        errorText={validationError(props)}
        {...props.input}
        onChange={this.handleOnChange}
        {...props}
      />
    );
  }
}

EnhancedTextField.propTypes = {
  input: PropTypes.object,
  onChangeInterceptor: PropTypes.func
};

export default EnhancedTextField;
