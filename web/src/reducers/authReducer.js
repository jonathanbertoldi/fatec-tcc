import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE } from '../actions/actionsTypes';

function authReducer (state = {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    isFetching: false,
    error: null
}, action) {
    switch(action.type) {
        case AUTH_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                adminCredentials: action.credentials
            })
        case AUTH_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                adminToken: action.adminToken
            })
        case AUTH_FAILURE:
            console.log(AUTH_FAILURE);
            return state;
        default:
            return state;
    }
}

export default authReducer;