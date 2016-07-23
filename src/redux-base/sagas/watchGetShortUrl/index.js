import { call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { GET_SHORT_URL } from 'app/redux-base/actions/shortener';
import getShortUrl from './getShortUrl';

export default function* watchGetShortUrl() {
  yield call(takeLatest, GET_SHORT_URL.REQUEST, getShortUrl);
}
