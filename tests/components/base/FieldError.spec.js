import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Col } from 'react-flexbox-grid';
import FieldError from 'components/base/FieldError';

describe('<FieldError />', () => {

  const setup = (props) => {
    const wrapper = mount(
      <FieldError
        field={{ error: 'ErrorMessage text' }}
        {...props}
      />
    );
    return {
      wrapper
    };
  }

  it('it should be rendered', () => {
    const { wrapper } = setup();

    expect(wrapper.length).toEqual(1);
  });

  describe('error message logic', () => {

    describe('takes error message from "field" property', () => {

      const { wrapper } = setup();

      it('it should render error ', () => {
        expect(wrapper.find(Col).props().children).toEqual('ErrorMessage text');
      });
    });

    describe('takes error message from "error" property', () => {

      const error = 'ErrorMessage text from "error" property';
      const { wrapper } = setup({ error });

      it('it should render error ', () => {
        expect(wrapper.find(Col).props().children).toEqual(error);
      });
    });

  });

});
