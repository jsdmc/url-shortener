import expect from 'expect';
import rootReducer from 'redux-base/reducers';

describe('rootReducer reducer', () => {
  const globalState = rootReducer({}, {type: 'testAction'});

  it('should keep shortener state under "shortener" prop', () => {
    expect(globalState).toIncludeKey('shortener');
  });

  it('should keep react-router-redux state under "routing" prop', () => {
    const initialRoutingState = { location: undefined };

    expect(globalState).toIncludeKey('routing');
    // expect(globalState.routing).toEqual(initialRoutingState);
  });

});
