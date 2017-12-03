// @flow
import { combineReducers } from 'redux';
import ConnReducer from './ConnReducer';
import nav from './nav';

export default combineReducers({
  connection: ConnReducer,
  nav
});
