import { ActionType } from './ActionType';
const initialStatelogin = {
    email: '',
    password: ''
}

export default function LoginReducer(state = initialStatelogin, action) {
    switch (action.type) {
        case ActionType.SET_LOGIN:
            return { ...action.payload }
        case ActionType.SET_LOGOUT:
            return {
                email: "",
                password: ""
            }
        default:
            return state;
    }
}
const initialStateproduct = [{
    name: "",
    price: "",
    detail: ""
}]

export function ProductReducer(state = initialStateproduct, action) {
    switch (action.type) {
        case ActionType.SET_PRODUCT:
            // console.log(action.payload);
            return action.payload

        case ActionType.NEW_PRODUCT:
            let setproduct = state;
            return [...setproduct, action.payload]

        case ActionType.EDIT_PRODUCT:
            let oldproducts = state;
            console.log(action.payload);
            const pindex = oldproducts.findIndex(c => c.id === action.payload.id);
            oldproducts[pindex] = action.payload;
            return [...oldproducts]

        case ActionType.DELETE_PRODUCT:
            let product = state;
            product = product.filter((c) => c.id !== action.payload)

            return product;

        default:
            return state;
    }
}