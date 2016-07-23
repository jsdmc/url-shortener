import { fork } from 'redux-saga/effects';
import watchGetShortUrl from './watchGetShortUrl';

export default function* root() {
  yield fork(watchGetShortUrl);
}
