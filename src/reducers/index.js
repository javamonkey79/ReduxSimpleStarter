import StocksReducer from './reducer_stocks';
import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  stocks: StocksReducer,
  form: formReducer
});

export default rootReducer;
