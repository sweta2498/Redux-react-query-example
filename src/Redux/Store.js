import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import LoginReducer, { ProductReducer } from "./Reducer";

export const reducers= combineReducers({
    Login:LoginReducer,
    Product:ProductReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;