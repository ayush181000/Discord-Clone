import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import authReducer from '../store/reducers/authReducer';

const rootReducer = combineReducers({ auth: authReducer });

const store = configureStore({
  reducer: rootReducer,
  devTools: composeWithDevTools(applyMiddleware(thunk)),
});

export default store;
