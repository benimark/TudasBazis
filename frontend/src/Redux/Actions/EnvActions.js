import {GET_MENU_FAIL, GET_MENU_REQUEST, GET_MENU_SUCCESS} from "../Constants/EnvConstants"
import axios from "axios"

export const getMenu = () => async(dispatch,getState) =>{
    dispatch({type:GET_MENU_REQUEST})
    try {
        const {user:{data}} = getState()
        const res = await axios.get('/api/menu/get-items',{headers:{ Authorization: `Bearer ${data&&data.token}` }})
        const constItems = [{type:"normal",content:"",icon:"bi-person-circle",title:"Bejelentkezés"}]
        dispatch({type:GET_MENU_SUCCESS,payload:constItems.concat(res.data)})
    } catch (error) {
        dispatch({type:GET_MENU_FAIL,payload:error.response.data.message?error.response.data.message:error})
    }
}