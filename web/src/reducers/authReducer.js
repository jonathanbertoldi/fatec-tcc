import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE } from '../actions/actionsTypes';

function authReducer (state = {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    isFetching: false,
    isFinished: false,
    error: null
}, action) {
    switch(action.type) {
        case AUTH_REQUEST:
            console.log(AUTH_REQUEST);
            return state;
        case AUTH_SUCCESS:
            console.log(AUTH_SUCCESS);
            return state;
        case AUTH_FAILURE:
            console.log(AUTH_FAILURE);
            return state;
        default:
            return state;
    }
}

export default authReducer;