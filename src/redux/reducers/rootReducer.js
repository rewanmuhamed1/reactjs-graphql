
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';
import cartReducer from './cartReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  product: productReducer,
  category : categoryReducer,
  cart: cartReducer, 
});

export default rootReducer
