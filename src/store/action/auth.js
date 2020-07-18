import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart=()=>{
    return{
        type:actionTypes.AUTH_START
    }
}
export const authSuccess=(Token, Id)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:Token,
        localId:Id
    }
}
export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout=()=>{
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const authLogout = (expiretime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout())
        },expiretime*1000)
    }
}

export const auth =(email,password, isSignup)=>{
    return dispatch=>{
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyACKlPV_KsR5f4gC39wKYaYg9hwsPPwy4k';
        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyACKlPV_KsR5f4gC39wKYaYg9hwsPPwy4k';
        }
        axios.post(url, authData)
        .then(response =>{
            console.log(response)
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(authLogout(response.data.expiresIn))
        })
        .catch(error=>{
            console.log(error)
            console.log(error.response)
            dispatch(authFail(error.response.data.error.message))
        })
    }
}

export const authRedirectPathset = (path)=>{
    return{
        type:actionTypes.AUTH_REDIRECT_PATH,
        path:path
    }
}