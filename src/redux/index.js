import { combineReducers } from 'redux'
import authentication from './authentication/reducer';
import ingredient from './ingredient/reducer';

export default combineReducers({
  authentication,
  ingredient
})