import expect from 'expect';
import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import apiRequest from 'redux-base/sagas/common/apiRequest';

const genNext = (gen, value) => (gen.next(value));
describe('apiRequest saga', () => {

  const promiseFunc = () => null;
  const apiClient = null;
  const fakeResponse = { data: { a: 1 } };

  const setup = (action) => {
    const generator = apiRequest(promiseFunc);
    return {
      generator
    };
  }

  const { generator } = setup();

  const createApiClient = genNext;
  it('creates instance of axios', () => {
    const nextValue = createApiClient(generator).value;
    const instance = axios.create();

    expect(nextValue).toBeA(instance.constructor)
  });

  const callApiPromise = genNext;
  it('calls api promise', () => {
    const nextValue = callApiPromise(generator, apiClient).value;

    expect(nextValue).toEqual(call(promiseFunc, apiClient));
  });

  const returnResponseObject = genNext;
  it('returns object with "response" prop', () => {
    const nextValue = returnResponseObject(generator, fakeResponse).value;

    expect(nextValue).toEqual({ response: fakeResponse });
  });

  const finish = genNext;
  it('finishes', () => {
    const done = finish(generator).done;

    expect(done).toEqual(true);
  });

  describe('handling errors', () => {

    const setup = (action) => {
      const generator = apiRequest(promiseFunc);
      createApiClient(generator);
      callApiPromise(generator, apiClient);

      return {
        generator
      };
    }

    it('returns object with "error" prop taken from catched Error instance', () => {
      const { generator } = setup();

      const testErrorMessage = 'message from Error instance';
      const nextValue = generator.throw(new Error(testErrorMessage)).value;

      expect(nextValue).toIncludeKey('error');
      expect(nextValue.error).toBeAn(Error);
      expect(nextValue.error.message).toEqual(testErrorMessage);
    });

    it('returns object with "error" prop taken from catched ApiClient rejection object', () => {
      const { generator } = setup();

      const testErrorMessage = 'message from ApiClient rejection object';
      const errorObj = { data: { message: testErrorMessage, fieldName: 'field error' }, status: 400 };
      const nextValue = generator.throw(errorObj).value;

      expect(nextValue).toIncludeKey('error');
      expect(nextValue.error).toBeAn(Error);
      expect(nextValue.error.message).toEqual(testErrorMessage);
    });
  });

  describe('making call with specified baseAction and action parameters', () => {

    const action = { prop1: 1, prop2: 2 };
    const baseAction = { SUCCESS: 'ACTION_SUCCESS', FAILURE: 'ACTION_FAILURE' };

    const setup = () => {
      const generator = apiRequest(promiseFunc, baseAction, action);
      createApiClient(generator);
      callApiPromise(generator, apiClient);

      return {
        generator
      };
    }

    describe('success response', () => {
      const { generator } = setup();

      const dispatchSuccessAction = genNext;
      it('dispatches baseAction.SUCCESS with props from action before calling saga', () => {
        const nextValue = dispatchSuccessAction(generator, fakeResponse).value;

        expect(nextValue).toEqual(put({ ...action, response: fakeResponse, type: baseAction.SUCCESS }));
      });
    });

    describe('error response', () => {
      const { generator } = setup();

      it('dispatches baseAction.FAILURE with props from action before calling saga', () => {
        const nextValue = generator.throw(new Error('error message')).value;
        expect(nextValue).toEqual(put({ ...action, error: 'error message', type: baseAction.FAILURE }));
      });
    });

  });

});
