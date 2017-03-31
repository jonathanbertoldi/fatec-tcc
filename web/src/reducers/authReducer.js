import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS } from '../actions/actionsTypes';

function authReducer (state = {
    isAuthenticated: localStorage.getItem('adminToken') ? true : false,
    isFetching: false,
    errorMessage: ''
}, action) {
    switch(action.type) {
        case AUTH_REQUEST:
            console.log(AUTH_REQUEST);
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                adminCredentials: action.credentials
            })
        case AUTH_SUCCESS:
            console.log(AUTH_SUCCESS);
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: '',
                adminToken: action.adminToken
            })
        case AUTH_FAILURE:
            console.log(AUTH_FAILURE);
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            })
        case LOGOUT_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: true
            })
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false
            })
        default:
            return state;
    }
}

export default authReducer;