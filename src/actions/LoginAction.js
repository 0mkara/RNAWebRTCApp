// @flow
import {
    LOGIN,
    SET_ACCESS_TOKEN
} from './types';

export function login(isLogin) {
    return {
        type: LOGIN,
        payload: isLogin
    }
}

export function set_access_token(access_token) {
    return {
        type: SET_ACCESS_TOKEN,
        payload: access_token
    }
}