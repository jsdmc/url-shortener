import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from './redux-base/configureStore';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import './styles/main.scss';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = configureStore();

const doRender = () => {
  const Root = require('./containers/Root').default;
  ReactDOM.render(
    <AppContainer>
      <MuiThemeProvider>
        <Root store={store} />
      </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('root')
  );
};
doRender();

if (module.hot) {
  module.hot.accept('./containers/Root', doRender);
}
