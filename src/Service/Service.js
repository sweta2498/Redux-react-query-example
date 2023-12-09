import { setLogout } from "../Redux/ActionCreator";

export function saveTokenInLocalStorage(tokenDetails) {
    tokenDetails.expireDate = tokenDetails.expiresIn
    localStorage.setItem('token',  JSON.stringify(tokenDetails));
}

export function runLogoutTimer( timer) {
    setTimeout(() => { 
        localStorage.removeItem('token');
        setLogout()
    }, timer);
}


export function saveTokenInLocalStorageproduct(tokenDetails) {
    tokenDetails.expireDate = tokenDetails.expiresIn
    localStorage.setItem('product',  JSON.stringify(tokenDetails));
}


