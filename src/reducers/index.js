// @flow
import { combineReducers } from 'redux';
import ConnReducer from './ConnReducer';
import LoginReducer from './LoginReducer';
import routes from './routes';
import chatReducer from './chatReducers';

export default combineReducers({
    connection: ConnReducer,
    login: LoginReducer,
    chatReducer,
    routes,
});
