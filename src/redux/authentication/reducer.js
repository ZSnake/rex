import * as types from './types';

const initialState = {
  user: {},
  error: '',
  loading: false
};

const authentication = (state = initialState, action) => {
  switch(action.type){
    case types.LOGIN_REQUEST:
      return {
        user: {},
        error: '',
        loading: true
      };
    case types.LOGIN_SUCCESS:
      return {
        user: action.user,
        error: '',
        loading: false
      };
    case types.LOGIN_FAILURE:
      return {
        user: {},
        error: action.error,
        loading: false
      };
    default:
      return initialState;
  }
}

export default authentication;

