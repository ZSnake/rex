import 'whatwg-fetch';
import { baseUrl } from '../config';


const getAddresses = (token, payload) => fetch(`${baseUrl}/user/${payload.id}/addresses`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  },
});

const addAddressToUser = (user, payload) => fetch(`${baseUrl}/user/${user.id}/address`, {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${user.token}`
  },
  body: JSON.stringify(payload)
});

const deleteAddresses = (token, payload) => fetch(`${baseUrl}/user/${payload}/addresses`, {
  method: 'DELETE',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  },
});

const deleteAddress = (user, payload) => fetch(`${baseUrl}/user/${user.id}/${payload.id}/address`, {
  method: 'DELETE',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${user.token}`
  },
});


export default {
  getAddresses,
  addAddressToUser,
  deleteAddresses,
  deleteAddress
};
