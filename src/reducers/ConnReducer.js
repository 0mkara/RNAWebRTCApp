import {
    DISCONNECTED,
    CONNECTED,
    SOCKETIDS,
    MESSAGE,
    SETUSER,
    DATACHAN_STAT,
    ROOM_JOIN
} from '../actions/types';

const INITIAL_STATE = {
    connected: false,
    socketids: [],
    message: {},
    datachan_stat: false,
    room_joined: false,
    username: ''
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CONNECTED:
            return { ...state, connected: true };
        case DISCONNECTED:
            return { ...state, connected: false, room_joined: false };
        case SOCKETIDS:
            return { ...state, socketids: action.payload };
        case SETUSER:
            return { ...state, username: action.payload.username };
        case MESSAGE:
            return { ...state, message: action.payload };
        case DATACHAN_STAT:
            return { ...state, datachan_stat: action.payload };
        case ROOM_JOIN:
            return { ...state, room_joined: true };
        case 'CHANGE_USERNAME':
            return {...state, username: action.username}
        default:
            return state;
    }
}
