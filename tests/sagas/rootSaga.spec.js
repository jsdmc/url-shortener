import expect from 'expect';
import { fork } from 'redux-saga/effects';
import rootSaga from 'app/redux-base/sagas';
import watchGetShortUrl from 'app/redux-base/sagas/watchGetShortUrl';

describe('rootSaga', () => {
  const generator = rootSaga();

  it('should fork watchGetShortUrl saga', () => {
    const nextValue = generator.next().value;
    const expectedValue = fork(watchGetShortUrl);
    expect(nextValue).toEqual(expectedValue);
  });

  it('should finish', () => {
    const done = generator.next().done;
    expect(done).toEqual(true);
  });
});
