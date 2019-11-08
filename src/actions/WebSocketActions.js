// @flow
import {
  CONNECTING,
  CONNECTED,
  DISCONNECTED,
  SOCKETIDS,
  CREATE_ROOM,
  LEAVE_ROOM,
  MESSAGE,
  DATACHAN_STAT,
  ROOM_JOIN,
  SET_MY_ID,
  SAVE_ROOM_INFO
} from './types';
import axios from 'axios';
import env from 'react-native-config';
import { AsyncStorage } from 'react-native';

export const connecting = dispatch => {
  dispatch({
    type: CONNECTING
  });
};

export const connected = dispatch => {
  dispatch({
    type: CONNECTED
  });
};

export const disconnected = dispatch => {
  dispatch({
    type: DISCONNECTED
  });
};

export const createRoom = () => async dispatch => {
  const token = await AsyncStorage.getItem('access_token');
  const userid = await axios.get(env.API_HOST + ':' + env.API_PORT + '/api/v1/auth/me?access_token=' + token);
  AsyncStorage.setItem('userid', userid.data.id);

  dispatch({
    type: CREATE_ROOM,
    payload: userid.data.id
  });
};

export const leaveRoom = () => dispatch => {
  dispatch({
    type: LEAVE_ROOM
  });
};

export const saveRoomInfo = data => {
  return {
    type: SAVE_ROOM_INFO,
    payload: data
  };
};

export const roomJoin = dispatch => {
  dispatch({
    type: ROOM_JOIN
  });
};
export function roomMembers(socketIds) {
  return {
    type: SOCKETIDS,
    payload: socketIds
  };
}

export function roomMember(socketId) {
  /*AsyncStorage.getItem(MEMBERS_KEY, (err, data) => {
        console.log(data);
        const socketIds = JSON.parse(data);
        socketIds.push(socketId);
    })*/
  return {
    type: SOCKETIDS,
    payload: socketId
  };
}

export function incommingMessage(from, message) {
  return {
    type: MESSAGE,
    payload: {
      from,
      message
    }
  };
}

export function datachannelOpened() {
  return {
    type: DATACHAN_STAT,
    payload: true
  };
}

export function setMySocketID(id) {
  return {
    type: SET_MY_ID,
    payload: id
  };
}
