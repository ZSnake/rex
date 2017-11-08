import * as types from './types';
import authenticationService from '../../services/authentication';

export const loginRequest = credentials => ({
  type: types.LOGIN_REQUEST,
  credentials
});

export const loginSuccess = user => ({
  type: types.LOGIN_SUCCESS,
  user
});

export const loginFailure = error => ({
  type: types.LOGIN_FAILURE,
  error
});

export const logout = () => ({
  type: types.LOGOUT,
});

export const login = credentials => dispatch => {
  dispatch(loginRequest());
  return authenticationService.login(credentials)
    .then(response => response.json())
    .then((parsedResponse) => {
      if (parsedResponse.statusCode >= 400) {
        return dispatch(loginFailure(parsedResponse.message))
      }
      dispatch(loginSuccess(parsedResponse));
      sessionStorage.setItem('user', JSON.stringify(parsedResponse));
    })
};