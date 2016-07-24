import React from 'react';
import expect from 'expect';
import { compose } from 'redux';
import { mount } from 'enzyme';
import createStore from 'redux-base/configureStore';
import { Provider } from 'react-redux';
import { Field } from 'redux-form';
import TextField from 'components/base/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FieldError from 'components/base/FieldError';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Shortener, { Shortener as Stateless, messages, appliedHocs } from 'components/Shortener';
import { GET_SHORT_URL, getShortUrlRequest } from 'redux-base/actions/shortener';

import styleFieldError from 'components/base/FieldError/style.scss';

describe('<Shortener />', () => {

  const setup = (props, options) => {

    const globalState = {};
    const store = createStore(globalState);

    const spyDispatch = expect.createSpy();
    const compWrapper = Wrapped => props => (
      <Wrapped
        {...props}
        dispatch={spyDispatch}
      />
    );

    const comContaner = compose(
      ...appliedHocs,
      compWrapper
    )(Stateless);

    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          {
            React.createElement(comContaner, props)
          }
        </MuiThemeProvider>
      </Provider>,
      options
    );
    return {
      wrapper,
      store,
      globalState,
      spyDispatch
    };
  };

  it('should be rendered', () => {
    const { wrapper } = setup();

    expect(wrapper.find(Stateless).length).toEqual(1);
  });

  describe('changing label for url TextField', () => {

    it('should display default label when url not entered', () => {
      const { wrapper } = setup();
      const field  = wrapper.find(Field);

      expect(field.prop('floatingLabelText')).toEqual(messages.urlFloatingLabel_emptyField);
    });

    it('should display another label when url entered', () => {
      const { wrapper } = setup();
      const field  = wrapper.find(Field);
      const input  = field.find('input');

      input.simulate('change', { target: { value: 'test' } });

      expect(field.prop('floatingLabelText')).toEqual(messages.urlFloatingLabel_notEmptyField);
    });

  });

  describe('rendering error', () => {
    it('it should not rendered error by default', () => {
      const { wrapper } = setup();
      const fieldError  = wrapper.find(FieldError);

      expect(fieldError.length).toEqual(0);
    });

    it('it should rendered error when something hanppaned during shortening', () => {
      const { wrapper, store } = setup();

      const error = 'test error';
      store.dispatch({ type: GET_SHORT_URL.FAILURE, error })
      const fieldError  = wrapper.find(FieldError);

      expect(fieldError.length).toEqual(1);
      expect(fieldError.prop('error')).toEqual(error);
    });
  });

  describe('rendering shortened Url', () => {
    it('it should not rendered input with result when there is no Url in state', () => {
      const { wrapper } = setup();
      const textField  = wrapper.find(TextField);

      expect(textField.length).toEqual(1);
    });

    it('it should rendered input with shortened Url', () => {
      const { wrapper, store } = setup();

      const shorten_url = 'shortened url';
      store.dispatch({
        type: GET_SHORT_URL.SUCCESS,
        response: { data: { shorten_url } }
      });
      const shortenUrlTextField  = wrapper.find(TextField).at(1);

      expect(shortenUrlTextField.length).toEqual(1);
      expect(shortenUrlTextField.prop('value')).toEqual(shorten_url);
    });
  });

  describe('validation', () => {
    it('should not handle sortening for invalid urls', () => {
      const { wrapper, store, spyDispatch } = setup();

      const invalidUrls = [
        'domain',
        'domain.c',
        'www.domain.c',
        'http:///domain.com',
        'http//domain.co',
        'http://www.domain.c',
        'http://sub.domain.c'
      ];

      const shortenBtn = wrapper.find(RaisedButton).at(0).find('button');

      invalidUrls.forEach(url => {
        const input  = wrapper.find(Field).find('input');
        input.simulate('change', { target: { value: url } });

        shortenBtn.simulate('click');

        expect(spyDispatch).toNotHaveBeenCalled();
      })
    });

    it('should dispatch request for shortening of valid Url', () => {
      const { wrapper, store, spyDispatch } = setup();

      const validUrls = [
        'domain.co',
        'wwww.domain.com',
        'http://domain.com',
        'http://www.domain.co',
        'http://www.sub.domain.com',
        'http://sub.domain.co'
      ];

      const shortenBtn = wrapper.find(RaisedButton).at(0).find('button');

      validUrls.forEach(url => {
        const input  = wrapper.find(Field).find('input');
        input.simulate('change', { target: { value: url } });

        shortenBtn.simulate('click');
        const expectedAction = getShortUrlRequest(url);

        expect(spyDispatch).toHaveBeenCalledWith(expectedAction);
      })
    });
  });

  describe('focus behaviour', () => {
    let testDomNode = null;

    beforeEach(() => {
      testDomNode = document.createElement('div');
      document.body.appendChild(testDomNode);
    });

    afterEach(() => {
      document.body.removeChild(testDomNode);
    });

    it('should have focus on TextField when mounted', () => {
      const { wrapper } = setup(null, { attachTo: testDomNode });
      const inputDomNode = wrapper.find(Field).find('input').node;

      expect(document.activeElement).toEqual(inputDomNode)
    })

    it('it should have focus on shortened Url when it mounted', () => {
      const { wrapper, store } = setup(null, { attachTo: testDomNode });

      const shorten_url = 'shortened url';
      store.dispatch({
        type: GET_SHORT_URL.SUCCESS,
        response: { data: { shorten_url } }
      });
      const inputDomNode  = wrapper.find(TextField).at(1).find('input').node;

      expect(document.activeElement).toEqual(inputDomNode)
    });

    it('it should have focus on shortened Url when new link processed', () => {
      const { wrapper, store } = setup(null, { attachTo: testDomNode });

      const shorten_url = 'shortened url';
      store.dispatch({
        type: GET_SHORT_URL.SUCCESS,
        response: { data: { shorten_url } }
      });
      // make sure it's not focus from 'componenDidMount'
      const urlTextField = wrapper.find(Field);
      urlTextField.node.getRenderedComponent().focus();
      // update shorten_url
      store.dispatch({
        type: GET_SHORT_URL.SUCCESS,
        response: { data: { shorten_url: 'newShortLink' } }
      });
      const inputDomNode  = wrapper.find(TextField).at(1).find('input').node;

      expect(document.activeElement).toEqual(inputDomNode)
    });
  })

});