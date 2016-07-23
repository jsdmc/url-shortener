import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form';
import TextField from 'components/base/TextField';
import FieldError from 'components/base/FieldError';
import RaisedButton from 'material-ui/RaisedButton';
import validate from './form/validate';
import { getShortenedUrl, getShortenerError } from 'redux-base/selectors/shortener';
import { getShortUrlRequest } from 'redux-base/actions/shortener';

import style from './style.scss';

class Shortener extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.props.handleSubmit(this.onSubmit);
  }

  onSubmit = ({ originUrl }) => {
    this.props.dispatch(getShortUrlRequest(originUrl));
  }

  render() {
    const { shortenedUrl, shortenerError } = this.props;
    return (
      <Grid className={style.container}>
        <Row middle="xs" center="xs">
          <Col xs={9}>
            <Field
              name="originUrl"
              component={TextField}
              hintText="Origin Url"
              floatingLabelText="Origin Url"
              style={{ width: '100%' }}
            />
            {shortenerError &&
              <FieldError error={shortenerError} />
            }
          </Col>
          <Col xs={3}>
            <RaisedButton
                label="Shorten"
                onClick={this.onSubmit}
            />
          </Col>
        </Row>
        <Row middle="xs" start="xs">
          <Col xs={9}>
            {
              shortenedUrl &&
              <div>
                <span>Shrotened URL:</span>
                <br/>
                { shortenedUrl }
              </div>
            }
          </Col>
        </Row>
      </Grid>
    );
  }
}

Shortener.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  shortenedUrl: PropTypes.string,
  shortenerError: PropTypes.string
};

const mapStateToProps = (state) => ({
  shortenedUrl: getShortenedUrl(state),
  shortenerError: getShortenerError(state)
});

export default compose(
  reduxForm({
    form: 'shortenerForm',
    validate
  }),
  connect(mapStateToProps)
)(Shortener);
