import {
    LOGIN,
    SET_ACCESS_TOKEN
} from '../actions/types';

const INITIAL_STATE = {
    isLogin: false,
    access_token: ''
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, isLogin: action.payload };
        case SET_ACCESS_TOKEN:
            return { ...state, access_token: action.payload };
        default:
            return state;
    }
}
