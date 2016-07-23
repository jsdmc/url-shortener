import expect from 'expect';
import config from 'config';
import { fork } from 'redux-saga/effects';
import apiRequest from 'redux-base/sagas/common/apiRequest';
import { GET_SHORT_URL } from 'redux-base/actions/shortener';
import getShortUrl from 'redux-base/sagas/watchGetShortUrl/getShortUrl';
import { getShortUrlRequest } from 'redux-base/actions/shortener';

const genNext = (gen, value) => (gen.next(value));
describe('getShortUrl saga', () => {
  const action = getShortUrlRequest('test1Url.com');
  let apiCall = null;
  const generator = getShortUrl(action);

  const createApiCall = genNext;
  it('should create api call to get whitelabels', () => {
    const url = `${config.API_URL}/s`;
    const params = { url: action.originUrl };

    apiCall = createApiCall(generator).value;

    const apiClientStub = { post: expect.createSpy() };

    apiCall(apiClientStub);

    expect(apiClientStub.post).toHaveBeenCalled();
    expect(apiClientStub.post).toHaveBeenCalledWith(url, params);
  });

  const forkApiRequest = genNext;
  it('should call apiRequest saga', () => {
    const nextValue = forkApiRequest(generator).value;
    const expectedValue = fork(apiRequest, apiCall, GET_SHORT_URL, action);

    expect(nextValue).toEqual(expectedValue);
  });

});