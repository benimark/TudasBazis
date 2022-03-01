import {ADMIN_LOG_IN_FAIL, ADMIN_LOG_IN_LOADING, ADMIN_LOG_IN_SUCCESS, IS_LOGGED_IN_FAIL, IS_LOGGED_IN_SUCCESS, LOG_IN_FAIL,LOG_IN_LOADING,LOG_IN_SUCCESS, LOG_OUT, SIGN_UP_FAILED, SIGN_UP_REQUEST, SIGN_UP_SUCCESS} from "../Constants/UserConstants"

export const login = (state={loggedIn:false,loading:true},action)=>{
    switch (action.type) {
        case LOG_IN_LOADING:
            return {loggedIn:false,loading:true}
        case LOG_IN_SUCCESS:
            return {loggedIn:true,loading:false,data:action.payload,error:null}
        case LOG_IN_FAIL:
            return {loggedIn:false,loading:false,error:action.payload}
        case IS_LOGGED_IN_SUCCESS:
            return {loggedIn:true,data:action.payload}
        case IS_LOGGED_IN_FAIL:
            return {loggedIn:false}
        case LOG_OUT:
            return {loggedIn:false}
        case ADMIN_LOG_IN_FAIL:
            return {loggedIn:false}
        case ADMIN_LOG_IN_LOADING:
            return {loading:true,loggedIn:false}
        case ADMIN_LOG_IN_SUCCESS:
            return {loading:false,loggedIn:true,data:action.payload}
        case SIGN_UP_REQUEST:
            return {loading:true}
        case SIGN_UP_SUCCESS:
            return {loggedIn:true,loading:false,data:action.payload}
        case SIGN_UP_FAILED:
            return {error:action.payload}
        default:
            return state
    }
}