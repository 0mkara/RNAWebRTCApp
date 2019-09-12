// @flow
import {
    USER_CHANGED
} from './types';

export function userChanged(user_name) {
    return {
        type: USER_CHANGED,
        payload: user_name
    }
}