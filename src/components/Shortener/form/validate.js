import is from 'is_js';

export default function validate({ originUrl }) {
  const errors = { };

  if (!originUrl) {
    errors.originUrl = 'Ooops. You forgot Url';
  } else if (!is.url(originUrl)) {
    errors.originUrl = 'This should be valid Url';
  }

  return errors;
}
