import { combineReducers } from 'redux'
import authentication from './authentication/reducer';
import ingredient from './ingredient/reducer';
import dish from './dish/reducer';
import address from './address/reducer';

export default combineReducers({
  authentication,
  ingredient,
  dish,
  address
})
