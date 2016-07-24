import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import TextField from 'components/base/TextField';
import MuiTextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FieldError from 'components/base/FieldError';
import _noop from 'lodash/noop';

describe('<TextField />', () => {

  const setup = (props) => {
    const wrapper = mount(
      <MuiThemeProvider>
        <TextField
          id="idToPreventWarnings"
          {...props}
        />
      </MuiThemeProvider>
    );
    return {
      wrapper
    };
  }

  it('it should be rendered', () => {
    const { wrapper } = setup();

    expect(wrapper.find(MuiTextField).length).toEqual(1);
  });

  it('it should pass "input" props to MaterialUI TextField ', () => {
    const onBlur = () => null;

    const inputProps = {
      value: 'val',
      onBlur
    };

    const { wrapper } = setup({ input: inputProps });
    const muiTextField = wrapper.find(MuiTextField);

    expect(muiTextField.props()).toInclude(inputProps);
  });

  describe('handling onChange', () => {
    it('it should pass "onChange" props to MaterialUI TextField ', () => {
      const { wrapper } = setup();
      const textField = wrapper.find(TextField);
      const muiTextField = wrapper.find(MuiTextField);

      expect(muiTextField.prop('onChange')).toEqual(textField.node.handleOnChange);
    });

    it('it should call "onChangeInterceptor" when "onChange" fired', () => {
      const spy = expect.createSpy();
      const { wrapper } = setup({ input: { onChange: _noop, onChangeInterceptor: spy } });
      const input = wrapper.find('input');
      const event = { target: { value: 'testVal' } };
      input.simulate('change', event);

      expect(spy.calls[0].arguments[0]).toInclude(event);
    });

  });

  describe('rendering error', () => {
    it('it should not rendered error when field not touched', () => {
      const { wrapper } = setup({ error: 'some error', touched: false });

      expect(wrapper.find(FieldError).length).toEqual(0);
    });

    it('it should rendered error when field has error and touched', () => {
      const { wrapper } = setup({ error: 'some error', touched: true });

      expect(wrapper.find(FieldError).length).toEqual(1);
    });
  });

});
