import expect from 'expect';
import { getShortenedUrl, getShortenerError } from 'redux-base/selectors/shortener';

describe('selectors for shortener', () => {
  const globalState = {
    shortener: {
      shortenedUrl: 'shortUrl',
      error: 'test error'
    }
  };

  describe('getShortenedUrl', () => {
    it('should return state slice with short url', () => {
      const actual = getShortenedUrl(globalState);
      const expected = globalState.shortener.shortenedUrl;

      expect(actual).toEqual(expected);
    });
  });

  describe('getShortenerError', () => {
    it('should return state slice with error', () => {
      const actual = getShortenerError(globalState);
      const expected = globalState.shortener.error;

      expect(actual).toEqual(expected);
    });
  });

});