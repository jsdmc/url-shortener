import { combineReducers } from 'redux';

import { routeReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import shortener from './shortener';

export default combineReducers({
  routing: routeReducer,
  form: formReducer,
  shortener
});
