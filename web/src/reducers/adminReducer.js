import { GET_ADMINS_REQUEST, GET_ADMINS_SUCCESS, GET_ADMINS_FAILURE, GET_ADDRESS_REQUEST, GET_ADDRESS_SUCCESS, GET_ADDRESS_FAILURE } from '../actions/actionsTypes';

function adminReducer(state = {
    isFetching: false,
    admins: [],
    errorMessage: '',
    viaCepError: ''
}, action) {
    switch(action.type) {
        case GET_ADMINS_REQUEST:
            console.log(GET_ADMINS_REQUEST);
            return Object.assign({}, state, {
                isFetching: true
            });
        case GET_ADMINS_SUCCESS:
            console.log(GET_ADMINS_SUCCESS);
            return Object.assign({}, state, {
                isFetching: false,
                admins: action.admins,
                errorMessage: ''
            });
        case GET_ADMINS_FAILURE:
            console.log(GET_ADMINS_FAILURE);
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.message
            });
        case GET_ADDRESS_REQUEST:
            console.log(GET_ADDRESS_REQUEST);
            return Object.assign({}, state, {
                isFetching: true,
                viaCepError: '',
                cep: action.cep
            })
        case GET_ADDRESS_SUCCESS:
            console.log(GET_ADDRESS_SUCCESS);
            return Object.assign({}, state, {
                isFetching: false,
                address: action.address
            });
        case GET_ADDRESS_FAILURE:
            console.log(GET_ADDRESS_FAILURE);
            return Object.assign({}, state, {
               isFetching: false,
               viaCepError: action.error, 
            });
        default:
            return state;
    }
}

export default adminReducer;