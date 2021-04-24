import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

const composeEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(reducer, composeEnhancer);

export default store;