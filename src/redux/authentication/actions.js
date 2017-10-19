import * as types from './types';
import authenticationService from '../../services/authentication';

export function loginRequest(credentials){
  return {
    type: types.LOGIN_REQUEST,
    credentials
  }
};

export function loginSuccess(user){
  return {
    type: types.LOGIN_SUCCESS,
    user
  }
};

export function loginFailure(error){
  return {
    type: types.LOGIN_FAILURE,
    error
  }
};

export function login(credentials){
  console.log('dispatching login');
  return (dispatch) => {
    dispatch(loginRequest());
    return authenticationService.login(credentials)
      .then(response => response.json())
      .then(parsedResponse => {
          console.log('parasf', parsedResponse);
          return parsedResponse.statusCode >= 400 ?
            dispatch(loginFailure(parsedResponse.message)) :
            dispatch(loginSuccess(parsedResponse));
        })
  };
}