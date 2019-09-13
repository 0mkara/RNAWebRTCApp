// @flow
import { combineReducers } from 'redux';
import ConnReducer from './ConnReducer';
import LoginReducer from './LoginReducer';
import routes from './routes';
import chatReducer from './chatReducers';
import profileReducer from './ProfileReducers';

export default combineReducers({
    connection: ConnReducer,
    login: LoginReducer,
    profile: profileReducer,
    chatReducer,
    routes,
});
