import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from "./authReducer";
import adminReducer from './adminReducer';

var rootReducer = combineReducers({
    auth: authReducer,
    admin: adminReducer,
    routing: routerReducer
})

export default rootReducer;