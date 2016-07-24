import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import FieldError from '../FieldError';

class EnhancedTextField extends Component {

  componentDidMount() {
    this.processFocus();
  }

  componentDidUpdate(prevProps) {
    if (this.props.autoFocus && this.props.value !== prevProps.value) {
      this.processFocus();
    }
  }

  processFocus() {
    if (this.props.autoFocus) {
      this.focus();
      this.textField.select();
    }
  }

  handleOnChange = (e) => {
    const { input } = this.props;
    if (input.onChangeInterceptor) {
      input.onChangeInterceptor(e);
    }
    input.onChange(e);
  }

  focus = () => {
    this.textField.focus();
  }

  render() {
    const { onChangeInterceptor, autoFocus, ...field } = this.props;
    const { input, ...rest } = field;
    return (
      <TextField
        ref={c => this.textField = c}
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
  onChangeInterceptor: PropTypes.func,
  autoFocus: PropTypes.bool,
  value: PropTypes.string
};

export default EnhancedTextField;
