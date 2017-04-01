import { AUTH_SUCCESS, AUTH_REQUEST, AUTH_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS } from './actionsTypes';

function authRequest(credentials) {
    return {
        type: AUTH_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        credentials
    }
}

function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        adminToken: token
    }
}

function authFailure(message) {
    return {
        type: AUTH_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message: message
    }
}

function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

export function loginAdmin(credentials) {
    const body = {
        login: credentials.username,
        senha: credentials.password
    }
    
    const config = {
        method: "POST",
        body: JSON.stringify(body),
        mode: 'cors',
        headers: new Headers({ 
            'Content-Type': 'application/json'
        })
    }

    return dispatch => {
        dispatch(authRequest(credentials));
        return fetch("http://localhost:8080/administradores/login", config)
            .then(response => response.json().then(json => ({json, response})))
            .then(({json, response}) => {
                if (response.ok) {
                    localStorage.setItem('adminToken', json.token)
                    dispatch(authSuccess(json.token))
                    return Promise.resolve(json);
                } else {
                    dispatch(authFailure(json.message))
                    return Promise.reject(json);
                }
            })    
            .catch(error => Promise.reject())
    }
}

export function logoutAdmin() {
  return dispatch => {
    dispatch(logoutRequest())
    localStorage.removeItem('adminToken')
    dispatch(logoutSuccess())
  }
}