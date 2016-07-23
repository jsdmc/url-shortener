import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import validationError from 'utils/validationError';

const EnhancedTextField = (props) => (
  <TextField
      errorText={validationError(props)}
      {...props.input}
      {...props}
  />
);

EnhancedTextField.propTypes = {
  input: PropTypes.object
};

export default EnhancedTextField;
