import * as types from './types';

const initialState = {
  ingredients: [],
  error: '',
  loading: false,
  ingredient: {},
};

const ingredients = (state = initialState, action) => {
  const { type, ingredients, ingredient, error } = action;
  switch(type){
    case types.CREATE_INGREDIENT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case types.CREATE_INGREDIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        ingredient
      }
    case types.CREATE_INGREDIENT_FAILURE:
      return {
        ...state,
        loading: false,
        error
      }
    case types.GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case types.GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        ingredients
      }
    case types.GET_INGREDIENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error
      }
    default:
      return state;
  }
}

export default ingredients;

