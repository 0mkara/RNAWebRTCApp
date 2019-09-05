// @flow
import {
    LOGIN
} from './types';

export function login(isLogin) {
    return {
        type: LOGIN,
        payload: isLogin
    }
}