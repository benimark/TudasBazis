import { GET_MENU_FAIL, GET_MENU_REQUEST, GET_MENU_SUCCESS } from "../Constants/EnvConstants"

export const menu = (state={loading:true},action)=>{
    switch (action.type) {
        case GET_MENU_SUCCESS:
            return {items:action.payload,loading:false}
        case GET_MENU_FAIL:
            return {items:[],loading:false,error:action.payload}
        case GET_MENU_REQUEST:
            return {loading:true}
        default:
            return state
    }
}