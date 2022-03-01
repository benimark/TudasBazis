import {applyMiddleware, combineReducers, createStore,compose} from "redux"
import {login} from "./Reducers/UserReducer"
import thunk from 'redux-thunk'
import { menu } from "./Reducers/EnvReducer"

const initialState = {
    user:{
        loggedIn: false,
        data: localStorage.getItem('data')?JSON.parse(localStorage.getItem('data')):null,
        loading:false
    },
    menu:{
        items:[]
    }
}
const reducer = combineReducers({
    user:login,
    menu
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)))

export default store;