// @flow
import { combineReducers } from 'redux';
import ConnReducer from './ConnReducer';
import routes from './routes';

export default combineReducers({
    connection: ConnReducer,
    routes,
});
