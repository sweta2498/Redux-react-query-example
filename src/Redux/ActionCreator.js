import { ActionType } from './ActionType'

export const setLogin = (payload) =>

    (dispatch) => {
        // console.log(payload);
        dispatch({
            type: ActionType.SET_LOGIN,
            payload
        })
    }

export const setLogout = () =>
    (dispatch) => {
        dispatch({
            type: ActionType.SET_LOGOUT
        });
    }

export const setGetProduct = (payload) =>
    (dispatch) => {
        // console.log(payload);
        dispatch({
            type: ActionType.SET_PRODUCT,
            payload
        });
    }
export const NewProductReducer = (payload) =>
    (dispatch) => {
        // console.log(payload);
        dispatch({
            type: ActionType.NEW_PRODUCT,
            payload
        });
    }

    export const UpdateProductReducer = (payload) =>
    (dispatch) => {
        // console.log(payload);
        dispatch({
            type: ActionType.EDIT_PRODUCT,
            payload
        });
    }

export const DeleteProduct = (payload) =>
    (dispatch) => {
        // console.log(payload);
        dispatch({
            type: ActionType.DELETE_PRODUCT,
            payload
        });
    }

