import { GET_SHORT_URL } from 'redux-base/actions/shortener';

export const initialState = {};

export default function shortener(state = initialState, action = {}) {
  switch (action.type) {

    case GET_SHORT_URL.REQUEST:
      return {
        ...state,
        loading: true
      };

    case GET_SHORT_URL.SUCCESS:
      return {
        ...state,
        shortenedUrl: action.response.data.shorten_url,
        loading: false,
        error: null
      };

    case GET_SHORT_URL.FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
}
