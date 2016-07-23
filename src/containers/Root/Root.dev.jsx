import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import DevTools from 'utils/DevTools';
import routes from '../../routes';

export default ({ store }) => (
  <Provider store={store}>
    <div>
      <Router history={browserHistory} routes={routes} />
      <DevTools />
    </div>
  </Provider>
);
