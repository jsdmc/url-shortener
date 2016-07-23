import { fork } from 'redux-saga/effects';
import axios from 'axios';

function* startup() {
  const result = yield axios.post('http://localhost:9990/s', { url: 'http://localhost:3000/about' });
  console.log(result);
}

export default function* root(getState) {
  yield fork(startup, getState);
}
