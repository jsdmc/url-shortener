import expect from 'expect';
import { call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { GET_SHORT_URL } from 'redux-base/actions/shortener';
import getShortUrl from 'redux-base/sagas/watchGetShortUrl/getShortUrl';
import watchGetShortUrl from 'redux-base/sagas/watchGetShortUrl';

describe('watchGetShortUrl saga', () => {
  const generator = watchGetShortUrl();

  it('should listen for GET_SHORT_URL.REQUEST action and fork getShortUrl saga', () => {
    const nextValue = generator.next().value;
    const expectedValue = call(takeLatest, GET_SHORT_URL.REQUEST, getShortUrl);
    expect(nextValue).toEqual(expectedValue);
  });

  it('should finish', () => {
    const done = generator.next().done;
    expect(done).toEqual(true);
  });
});
