import 'whatwg-fetch';
import { baseUrl } from '../config';

const createDish = (token, payload) => fetch(`${baseUrl}/dish`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify(payload)
});

const getDishes = token => fetch(`${baseUrl}/dishes`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  },
});

const addIngredientsToDish = (token, payload) => fetch(`${baseUrl}/dish/ingredients/${payload.dishId}`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify(delete payload.dishId)
});

export default {
  createDish,
  getDishes,
  addIngredientsToDish,
}