import { API_BASE_URL } from '../constants/urls.js';
import { GET_ADMINS_REQUEST, GET_ADMINS_SUCCESS, GET_ADMINS_FAILURE } from './actionsTypes.js';
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