import * as types from './types';

const initialState = {
  addresses: [],
  error: '',
  loading: false,
  address: {},
};

const addresses = (state = initialState, action) => {
  const { type, addresses, address, error } = action;
  switch(type){
    case types.CREATE_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case types.CREATE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        address
      }
    case types.CREATE_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error
      }
      case types.DELETE_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case types.DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses
      }
    case types.DELETE_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error
      }
    case types.GET_ADDRESSES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case types.GET_ADDRESSES_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses
      }
    case types.GET_ADDRESSES_FAILURE:
      return {
        ...state,
        loading: false,
        error
      }
    default:
      return state;
  }
}

export default addresses;
