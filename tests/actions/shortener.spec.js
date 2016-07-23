import expect from 'expect';
import { GET_SHORT_URL, getShortUrlRequest } from 'redux-base/actions/shortener';

describe('shortener actions', () => {

  it('should have base action GET_SHORT_URL', () => {
    expect(GET_SHORT_URL).toIncludeKeys(['REQUEST', 'SUCCESS', 'FAILURE']);
  });

  it('getShortUrlRequest should dispatch GET_SHORT_URL.REQUEST', () => {
    const testUrl = 'testUrl';
    const actualValue = getShortUrlRequest(testUrl);

    const expectedValue = {
      type: GET_SHORT_URL.REQUEST,
      originUrl: testUrl,
    };

    expect(actualValue).toEqual(expectedValue);
  });
});
