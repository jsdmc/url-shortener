import React, { PropTypes } from 'react';
import { Row, Col } from 'react-flexbox-grid';

import style from './style.scss';

const FieldError = (props) => {
  const { field, error } = props;
  const errorMessage = error || field.error;

  return (
    <Row between="xs">
      <Col xs={10} className={style.error}>
        { errorMessage }
      </Col>
    </Row>
  );
};

FieldError.propTypes = {
  field: PropTypes.object,
  error: PropTypes.string
};

export default FieldError;
