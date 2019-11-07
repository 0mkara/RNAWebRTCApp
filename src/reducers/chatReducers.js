import {
    USER_CHANGED, SAVE_ROOM_INFO
} from '../actions/types';

const INITIAL_STATE = {
    chatUser: ''
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_CHANGED:
            return { ...state, chatUser: action.payload }
        case SAVE_ROOM_INFO:
            return {...state, roomInfo: action.payload}

        default:
            return state;
    }
}
