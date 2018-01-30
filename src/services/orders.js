import 'whatwg-fetch';
import { baseUrl } from '../config';

const createOrder = (user, payload) => fetch(`${baseUrl}/order/${user.id}`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${user.token}`
  },
  body: JSON.stringify(payload)
});

const getOrders = token => fetch(`${baseUrl}/orders`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  },
});

const completeOrder = (user, payload) => fetch(`${baseUrl}/order/${user.id}/${payload.id}`, {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${user.token}`
  },
  body: JSON.stringify(payload)
});

export default {
  createOrder,
  getOrders,
  completeOrder
};
