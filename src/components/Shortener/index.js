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
import Clipboard from 'clipboard';
import _noop from 'lodash/noop';

import style from './style.scss';

export const messages = {
  urlFloatingLabel_emptyField: 'Paste a link to shorten it',
  urlFloatingLabel_notEmptyField: 'Origin Link'
};

const muiStyle = {
  width100: { width: '100%' }
};

export class Shortener extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.props.handleSubmit(this.onSubmit);
    this.state = {
      urlFloatingLabel: messages.urlFloatingLabel_emptyField
    };
  }

  componentDidMount() {
    this.urlTextField.getRenderedComponent().focus();
    this.clipboard = new Clipboard(
      '.copyToClipboard button',
      {
        text: () => this.props.shortenedUrl
      }
    );
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  onSubmit = ({ originUrl }) => {
    this.props.dispatch(getShortUrlRequest(originUrl));
  }

  handleOnChangeUrl = (e) => {
    const url = e.target.value.trim();
    if (!url) {
      this.setState({ urlFloatingLabel: messages.urlFloatingLabel_emptyField });
    } else {
      this.setState({ urlFloatingLabel: messages.urlFloatingLabel_notEmptyField });
    }
  }

  render() {
    const { shortenedUrl, shortenerError } = this.props;
    return (
      <Grid className={style.container}>
        <Row middle="xs" center="xs" className={style.inputRow}>
          <Col xs={9}>
            <Field
              ref={c => this.urlTextField = c}
              withRef
              name="originUrl"
              component={TextField}
              onChangeInterceptor={this.handleOnChangeUrl}
              floatingLabelText={this.state.urlFloatingLabel}
              style={muiStyle.width100}
            />
            {shortenerError &&
              <FieldError error={shortenerError} />
            }
          </Col>
          <Col xs={3}>
            <RaisedButton
              label="Shorten"
              onClick={this.onSubmit}
              fullWidth
              style={muiStyle.width100}
            />
          </Col>
        </Row>
        {shortenedUrl &&
          <Row middle="xs" start="xs" className={style.inputRow}>
            <Col xs={9}>
              <TextField
                autoFocus
                floatingLabelText="Shortened Link"
                floatingLabelFixed
                onChange={_noop}
                value={shortenedUrl}
                style={muiStyle.width100}
              />
            </Col>
            <Col xs={3}>
              <RaisedButton
                className="copyToClipboard"
                label="Copy"
                primary
                fullWidth
                style={muiStyle.width100}
              />
            </Col>
          </Row>
        }
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

export const appliedHocs = [
  reduxForm({
    form: 'shortenerForm',
    destroyOnUnmount: false,
    validate
  }),
  connect(mapStateToProps)
];

export default compose(...appliedHocs)(Shortener);
