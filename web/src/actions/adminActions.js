import { API_BASE_URL, VIA_CEP_URL } from '../constants/urls.js';
import { GET_ADMINS_REQUEST, GET_ADMINS_SUCCESS, GET_ADMINS_FAILURE, GET_ADDRESS_REQUEST, GET_ADDRESS_SUCCESS, GET_ADDRESS_FAILURE } from './actionsTypes.js';
import authenticatedHeader from '../utils/authenticatedHeader';

function getAdminsRequest() {
    return {
        type: GET_ADMINS_REQUEST,
        isFetching: true
    }
}

function getAdminsSuccess(admins) {
    return {
        type: GET_ADMINS_SUCCESS,
        isFetching: false,
        admins: admins
    }
}

function getAdminsFailure(message) {
    return {
        type: GET_ADMINS_FAILURE,
        isFetching: false,
        message: message
    }
}

function getAddressRequest(cep) {
    return {
        type: GET_ADDRESS_REQUEST,
        isFetching: true,
        cep: cep
    }
}

function getAddressSuccess(address) {
    return {
        type: GET_ADDRESS_SUCCESS,
        isFetching: false,
        address: address
    }
}

function getAddressFailure(error) {
    return {
        type: GET_ADDRESS_FAILURE,
        isFetching: false,
        error: error
    }
}

export function getAdmins() {
    const config = {
        headers: authenticatedHeader()
    }

    return dispatch => {
        dispatch(getAdminsRequest());
        return fetch(API_BASE_URL + "/administradores", config)
            .then(response => response.json().then(json => ({json, response})))
            .then(({json, response}) => {
                if (response.ok) {
                    dispatch(getAdminsSuccess(json));
                    return json;
                } else {
                    throw new Error(json.message);
                }
            })
            .catch(error => {
                dispatch(getAdminsFailure(error.message))
            })
    }
}

export function getAddress(cep) {
    const config = {
        headers: new Headers({
            'Content-Type': 'application/json'
        }) 
    }

    return dispatch => {
        dispatch(getAddressRequest(cep));
        return fetch(VIA_CEP_URL + cep + "/json", config)
            .then(response => response.json().then(json => ({json, response})))
            .then(({json,response}) => {
                if (response.ok) {
                    if (json.erro) {
                        throw new Error("O CEP informado não existe");
                    } else {
                        dispatch(getAddressSuccess(json));
                    }
                    return Promise.resolve(json);
                } else {
                    throw new Error(json);
                }
            })
            .catch(error => {
                dispatch(getAddressFailure(error.message));
                return Promise.reject(error);
            });
    }
}