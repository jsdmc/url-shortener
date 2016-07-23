import createRequestTypes from 'app/utils/createRequestTypes';

export const GET_SHORT_URL = createRequestTypes('GET_SHORT_URL');

export function getShortUrlRequest(originUrl) {
  return {
    type: GET_SHORT_URL.REQUEST,
    originUrl
  };
}
