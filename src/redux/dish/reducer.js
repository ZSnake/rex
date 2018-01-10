import * as types from './types';

const initialState = {
  dishes: [],
  error: '',
  loading: false,
  dish: {},
};

const dishes = (state = initialState, action) => {
  const { type, dishes, dish, error } = action;
  switch(type){
    case types.CREATE_DISH_REQUEST:
      return {
        ...state,
        loading: true
      }
    case types.CREATE_DISH_SUCCESS:
      return {
        ...state,
        loading: false,
        dish
      }
    case types.CREATE_DISH_FAILURE:
      return {
        ...state,
        loading: false,
        error
      }
    case types.GET_DISHES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case types.GET_DISHES_SUCCESS:
      return {
        ...state,
        loading: false,
        dishes
      }
    case types.GET_DISHES_FAILURE:
      return {
        ...state,
        loading: false,
        error
      }
    default:
      return state;
  }
}

export default dishes;
