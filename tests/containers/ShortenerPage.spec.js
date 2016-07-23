import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import createStore from 'redux-base/configureStore';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ShortenerPage, { ShortenerPage as Stateless } from 'containers/ShortenerPage';

describe('<ShortenerPage />', () => {

  const setup = (props) => {

    const globalState = {};
    const store = createStore(globalState);

    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <ShortenerPage {...props} />
        </MuiThemeProvider>
      </Provider>
    );
    return {
      wrapper,
      store,
      globalState
    };
  };

  it('should be rendered', () => {
    const { wrapper } = setup();

    expect(wrapper.find(Stateless).length).toEqual(1);
  });

});