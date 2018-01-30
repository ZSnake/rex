import * as types from './types';

const initialState = {
  orders: [],
  error: '',
  loading: false,
  order: {},
};

const orders = (state = initialState, action) => {
  const { type, orders, order, error } = action;
  switch(type){
    case types.CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case types.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order
      }
    case types.CREATE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error
      }
      case types.DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case types.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders
      }
    case types.DELETE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error
      }
    case types.GET_ORDERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case types.GET_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders
      }
    case types.GET_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error
      }
    default:
      return state;
  }
}

export default orders;
