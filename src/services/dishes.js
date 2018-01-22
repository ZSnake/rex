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

const addIngredientsToDish = (token, payload) => fetch(`${baseUrl}/dish/ingredients/${payload.id}`, {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify(payload.ingredients)
});

const deleteDish = (token, payload) => fetch(`${baseUrl}/dish/${payload.id}`, {
  method: 'DELETE',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  },
});



export default {
  createDish,
  getDishes,
  addIngredientsToDish,
  deleteDish
}
