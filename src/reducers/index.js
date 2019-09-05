// @flow
import { combineReducers } from 'redux';
import ConnReducer from './ConnReducer';
import LoginReducer from './LoginReducer';
import routes from './routes';

export default combineReducers({
    connection: ConnReducer,
    login: LoginReducer,
    routes,
});
