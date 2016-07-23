import { combineReducers } from 'redux';

import { routeReducer } from 'react-router-redux';
import shortener from './shortener';

export default combineReducers({
  routing: routeReducer,
  shortener
});
