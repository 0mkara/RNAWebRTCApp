// @flow
import {
    TOGGLE_EDITABILITY,
    SET_USER_INFO
} from './types';

export function set_editability(payload) {
    return {
        type: TOGGLE_EDITABILITY,
        payload
    }
}
export function set_user_info(payload) {
    return {
        type: SET_USER_INFO,
        payload
    }
}