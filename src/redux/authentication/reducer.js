import * as types from './types';

const initialState = {
  user: {},
  error: '',
  loading: false
};

const authentication = (state = initialState, action) => {
  const { type, user, error } = action
  switch (type) {
    case types.LOGIN_REQUEST:
      return {
        user: {},
        error: '',
        loading: true
      };
    case types.LOGIN_SUCCESS:
      return {
        user: user,
        error: '',
        loading: false
      };
    case types.LOGIN_FAILURE:
      return {
        user: {},
        error,
        loading: false
      };
    case types.SHOW_LOADING:
      return {
        loading: true
      };
    case types.CLEAR_LOADING:
      return {
        loading: false
      };
    case types.SET_ERROR:
      return {
        error
      };
    case types.SET_CREATED_USER:
      return {
        user
      };
    default:
      return initialState;
  }
}

export default authentication;

