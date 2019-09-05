import {
    LOGIN
} from '../actions/types';

const INITIAL_STATE = {
    isLogin: false,
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, isLogin: action.payload };
        default:
            return state;
    }
}
