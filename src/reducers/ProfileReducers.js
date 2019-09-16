import {
    TOGGLE_EDITABILITY,
    SET_USER_INFO
} from '../actions/types';

const INITIAL_STATE = {
    formEnabled: false,
    userInfo: {
        avatar: "",
        email: "",
        id: "",
        name: "",
        password: "",
        phone: "",
        username: "",
    }
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_EDITABILITY:
            return { ...state, formEnabled: action.payload };
        case SET_USER_INFO:
            return { ...state, userInfo: action.payload }
        default:
            return state;
    }
}
