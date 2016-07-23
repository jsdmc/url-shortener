import expect from 'expect';
import shortener, { initialState } from 'redux-base/reducers/shortener';

describe('shortener reducer', () => {
  it('should have initial state', () => {
    const actualState = shortener(undefined, {});

    expect(actualState).toEqual(initialState);
  });
});
