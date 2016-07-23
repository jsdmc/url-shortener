import { fork, take } from 'redux-saga/effects';
import apiRequest from '../common/apiRequest';
import { GET_SHORT_URL } from 'app/redux-base/actions/shortener';

export default function* getShortUrl(action) {
  const { originUrl } = action;

  const apiUrl = 'http://localhost:9990/s';
  const apiCall = apiClient => apiClient.post(apiUrl, { url: originUrl });
  yield apiCall;

  yield fork(apiRequest, apiCall, GET_SHORT_URL, action);

  const successAction = yield take(GET_SHORT_URL.SUCCESS);

  console.log(successAction);
}
