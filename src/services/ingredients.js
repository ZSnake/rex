import 'whatwg-fetch';
import { baseUrl } from '../config';

const createIngredient = (token, payload) => fetch(`${baseUrl}/ingredient`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify(payload)
});

const getIngredients = token => fetch(`${baseUrl}/ingredients`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  },
});

export default {
  createIngredient,
  getIngredients,
}