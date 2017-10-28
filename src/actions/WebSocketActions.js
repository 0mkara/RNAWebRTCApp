// @flow
import {
  CONNECTING,
  CONNECTED,
  DISCONNECTED,
  SOCKETIDS,
  MESSAGE,
  DATACHAN_STAT,
  ROOM_JOIN
} from './types';

export const connecting = (dispatch: any) => {
    dispatch({
        type: CONNECTING
    });
}

export const connected = (dispatch: any) => {
    dispatch({
        type: CONNECTED
    });
}

export const disconnected = (dispatch: any) => {
    dispatch({
        type: DISCONNECTED
    });
}

export const roomJoin = (dispatch: any) => {
    dispatch({
        type: ROOM_JOIN
    });
}
export function roomMembers(socketIds: string) {
    return {
        type: SOCKETIDS,
        payload: socketIds
    }
}

export function roomMember(socketId: string) {
    /*AsyncStorage.getItem(MEMBERS_KEY, (err, data) => {
        console.log(data);
        const socketIds = JSON.parse(data);
        socketIds.push(socketId);
    })*/
    return {
        type: SOCKETIDS,
        payload: socketId
    }
}

export function incommingMessage(from: string, message: string) {
    return {
        type: MESSAGE,
        payload: {
            from,
            message
        }
    }
}

export function datachannelOpened() {
    return {
        type: DATACHAN_STAT,
        payload: true
    }
}
