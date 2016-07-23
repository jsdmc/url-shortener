import { call, put } from 'redux-saga/effects';
import axios from 'axios';

export default function* apiRequest(promise, baseAction, action) {
  const apiClient = yield axios.create();

  try {
    const response = yield call(promise, apiClient);

    if (baseAction) {
      yield put({ ...action, response, type: baseAction.SUCCESS });
    }

    return { response };
  } catch (error) {
    const isServerError = !(error instanceof Error);
    const errorMessage = isServerError
      ? error.data.message
      : error.message;

    if (baseAction) {
      yield put({ ...action, error: errorMessage, type: baseAction.FAILURE });
    }

    return { error: new Error(errorMessage) };
  }
}
