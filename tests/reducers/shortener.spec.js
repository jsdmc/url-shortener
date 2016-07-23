import expect from 'expect';
import shortener, { initialState } from 'redux-base/reducers/shortener';
import { GET_SHORT_URL, getShortUrlRequest } from 'redux-base/actions/shortener';

describe('shortener reducer', () => {
  it('should have initial state', () => {
    const actualState = shortener(undefined, {});

    expect(actualState).toEqual(initialState);
  });

  it('should handle GET_SHORT_URL.REQUEST action', () => {
    const action = getShortUrlRequest();

    const state = {
      shortenedUrl: 'test',
      loading: false
    };

    const actualState = shortener(state, action);

    const expectState = {
      shortenedUrl: 'test',
      loading: true
    };

    expect(actualState).toEqual(expectState);
  });

  it('should handle GET_SHORT_URL.SUCCESS action', () => {
    const action = {
      type: GET_SHORT_URL.SUCCESS,
      response: {
        data: {
          shortenUrl: 'newShortUrl'
        }
      }
    };

    const state = {
      shortenedUrl: 'test',
      loading: true,
      error: 'test error'
    };

    const actualState = shortener(state, action);

    const expectState = {
      shortenedUrl: action.response.data.results,
      loading: false,
      error: null
    };

    expect(actualState).toEqual(expectState);
  });

  it('should handle GET_SHORT_URL.FAILURE action', () => {
    const error= 'test error';
    const action = {
      type: GET_SHORT_URL.FAILURE,
      error
    }

    const state = {
      shortenedUrl: 'test',
      loading: true
    };

    const actualState = shortener(state, action);

    const expectState = {
      shortenedUrl: 'test',
      loading: false,
      error: error
    };

    expect(actualState).toEqual(expectState);
  });

  it('should handle unknown actions', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
      someProp: 1
    }

    const state = {
      shortenedUrl: 'test',
      loading: true
    };

    const actualState = shortener(state, action);

    expect(actualState).toEqual(state);
  });
});
