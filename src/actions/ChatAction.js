// @flow
import { USER_CHANGED, SET_CHATID } from './types';

export function userChanged(user_name) {
  return {
    type: USER_CHANGED,
    payload: user_name
  };
}

export function setChatID(socketID) {
  return {
    type: SET_CHATID,
    payload: socketID
  };
}
