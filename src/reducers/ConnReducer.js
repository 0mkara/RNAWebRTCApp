import {
    DISCONNECTED,
    CONNECTED,
    SOCKETIDS,
    MESSAGE,
    DATACHAN_STAT,
    ROOM_JOIN,
    SET_MY_ID
} from '../actions/types';

const INITIAL_STATE = {
    connected: false,
    my_socket_id: '',
    socketids: [],
    message: {},
    datachan_stat: false,
    room_joined: false
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CONNECTED:
            return { ...state, connected: true };
        case DISCONNECTED:
            return { ...state, connected: false, room_joined: false };
        case SOCKETIDS:
            return { ...state, socketids: action.payload };
        case MESSAGE:
            return { ...state, message: action.payload };
        case DATACHAN_STAT:
            return { ...state, datachan_stat: action.payload };
        case ROOM_JOIN:
            return { ...state, room_joined: true };
        case SET_MY_ID:
            return { ...state, my_socket_id: action.payload }
        default:
            return state;
    }
}
