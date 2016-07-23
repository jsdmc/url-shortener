import React from 'react';
import FieldError from 'components/base/FieldError';

export default (field) => (field.error && field.touched && <FieldError field={field} />);
