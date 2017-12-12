import * as types from './types';

const initialState = {
  user: JSON.parse(sessionStorage.getItem('user')) || {},
  error: '',
  loading: false
};

const authentication = (state = initialState, action) => {
  const { type, user, error } = action
  switch (type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        error,
        loading: false
      };
    case types.SHOW_LOADING:
      return {
        loading: true
      };
    case types.CLEAR_LOADING:
      return {
      };
    case types.SET_ERROR:
      return {
        error
      };
    case types.LOGOUT:
      sessionStorage.clear();
      return {
        ...state,
        user: {}
      }
    default:
      return initialState;
  }
}

export default authentication;

