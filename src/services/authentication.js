import 'whatwg-fetch';
import { baseUrl } from '../config';

const login = credentials => fetch(`${baseUrl}/login`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
  },
  body: JSON.stringify(credentials)
});

const registerUser = user => fetch(`${baseUrl}/register`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
  },
  body: JSON.stringify(user)
});

export default {
  login,
  registerUser
};