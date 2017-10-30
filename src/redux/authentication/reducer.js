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
        error: error,
        loading: false
      };
    case types.FETCH_USER:
      const storageUser = JSON.parse(sessionStorage.getItem('user'));
      return {
        ...state,
        user: storageUser ? storageUser : {},
      };
    case types.LOGOUT:
      sessionStorage.clear();
      return {
        ...state,
        user: {},
      };
    default:
      return initialState;
  }
}

export default authentication;

