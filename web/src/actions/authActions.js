import { AUTH_SUCCESS, AUTH_REQUEST, AUTH_FAILURE } from './actionsTypes';

function authRequest(credentials) {
    return {
        type: AUTH_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        credentials
    }
}

function authSuccess(admin) {
    return {
        type: AUTH_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        adminToken: admin.token
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
            .then(response => response.json())
            .then(json => console.log(json))
    }
}