import {ADMIN_LOG_IN_FAIL, ADMIN_LOG_IN_LOADING, ADMIN_LOG_IN_SUCCESS, IS_LOGGED_IN_FAIL, IS_LOGGED_IN_SUCCESS, LOG_IN_FAIL,LOG_IN_LOADING,LOG_IN_SUCCESS, LOG_OUT, SIGN_UP_FAILED, SIGN_UP_REQUEST, SIGN_UP_SUCCESS} from "../Constants/UserConstants"
import axios from "axios"

export const login = (email,password) => async(dispatch) =>{
    dispatch({type:LOG_IN_LOADING,payload:{email,password}})
    try {
        const {data} = await axios.post('/api/users/login', {
            email,
            password
        })
        localStorage.setItem('data',JSON.stringify(data))
        dispatch({type:LOG_IN_SUCCESS,payload:data})
    } catch (error) {
        localStorage.removeItem('data')
        dispatch({type:LOG_IN_FAIL,payload:error.response.data.Error?error.response.data.Error:error})
    }
}
export const adminLogin = (email,password) => async(dispatch) =>{
    dispatch({type:ADMIN_LOG_IN_LOADING,payload:{email,password}})
    try {
        const {data} = await axios.post('/api/users/admin-login', {
            email,
            password
        })
        localStorage.setItem('data',JSON.stringify(data))
        dispatch({type:ADMIN_LOG_IN_SUCCESS,payload:data})
    } catch (error) {
        localStorage.removeItem('data')
        dispatch({type:ADMIN_LOG_IN_FAIL,payload:error.response.data.Error?error.response.data.Error:error})
    }
}
export const signup = (email,password,name) => async(dispatch) =>{
    dispatch({type:SIGN_UP_REQUEST})
    try {
        const {data} = await axios.post('/api/users/signup', {
            email,
            password,
            name
        })
        localStorage.setItem('data',JSON.stringify(data))
        dispatch({type:SIGN_UP_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:SIGN_UP_FAILED,payload:Object.values(error.response.data.errors)[0].message?Object.values(error.response.data.errors)[0].message:"Hiba! "+error})
    }
}
export const logout = () => async(dispatch) =>{
    localStorage.removeItem('data')
    dispatch({type:LOG_OUT})
}
export const isLoggedIn = () => async(dispatch) =>{
    try {
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('data')).token}` }
        }
        const {data} = await axios.get('/api/users/valid',config)
        dispatch({type:IS_LOGGED_IN_SUCCESS,payload:data})       
    } catch (error) {
        localStorage.removeItem('data')
        dispatch({type:IS_LOGGED_IN_FAIL,payload:false})
    }
}