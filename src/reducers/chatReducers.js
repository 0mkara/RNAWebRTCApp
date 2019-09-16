import {
    USER_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
    chatUser: ''
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_CHANGED:
            return { ...state, chatUser: action.payload }

        default:
            return state;
    }
}
