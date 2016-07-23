import React, { PropTypes } from 'react';
import Warning from 'material-ui/svg-icons/alert/warning';
import { Row, Col } from 'react-flexbox-grid';

import style from './style.scss';

const FieldError = (props) => {
  const { field, error, showIcon } = props;
  const errorMessage = error || field.error;

  return (
    <Row between="xs">
      <Col xs={10} className={style.error}>
        { errorMessage }
      </Col>
      <Col xs={2}>
        {showIcon &&
          <Warning className={style.warningIcon}/>
        }
      </Col>
    </Row>
  );
};

FieldError.propTypes = {
  field: PropTypes.object,
  error: PropTypes.string,
  showIcon: PropTypes.bool
};

export default FieldError;
