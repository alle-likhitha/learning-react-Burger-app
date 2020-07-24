import * as actionTypes from './actionTypes';
// import axios from 'axios';

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
    // localStorage.removeItem('token');
    // localStorage.removeItem('expireTime');
    // localStorage.removeItem('userId')
    return{
        type:actionTypes.AUTH_INITIAL_LOGOUT
    }
}
export const logoutSucceed = ()=>{
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const authTimeout = (expiretime)=>{
    return{
        type:actionTypes.AUTH_TIMEOUT_SAGA,
        expiretime : expiretime
    }
}

export const auth =(email,password, isSignup)=>{
    // return dispatch=>{
    //     dispatch(authStart());
    //     const authData = {
    //         email: email,
    //         password: password,
    //         returnSecureToken: true
    //     };
    //     let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyACKlPV_KsR5f4gC39wKYaYg9hwsPPwy4k';
    //     if(!isSignup){
    //         url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyACKlPV_KsR5f4gC39wKYaYg9hwsPPwy4k';
    //     }
    //     axios.post(url, authData)
    //     .then(response =>{
    //         console.log(response)
    //         const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000)
    //         localStorage.setItem('token', response.data.idToken);
    //         localStorage.setItem('expireTime', expirationTime);
    //         localStorage.setItem('userId',response.data.localId);
    //         dispatch(authSuccess(response.data.idToken, response.data.localId))
    //         dispatch(authTimeout(response.data.expiresIn))
    //     })
    //     .catch(error=>{
    //         console.log(error)
    //         console.log(error.response)
    //         dispatch(authFail(error.response.data.error.message))
    //     })
    // }

    return{
        type: actionTypes.AUTH_USER_SAGA,
        email:email,
        password:password,
        isSignup:isSignup
    }
}

export const authRedirectPathset = (path)=>{
    return{
        type:actionTypes.AUTH_REDIRECT_PATH,
        path:path
    }
}

export const authCheckSignup = ()=>{
    // return dispatch=>{
    //     const token = localStorage.getItem('token');
        
    //     if(!token){
    //         dispatch(logout())
    //     }
    //     else{
    //         const expireTime = new Date(localStorage.getItem('expireTime'));
    //         if(expireTime <= new Date()){
    //             dispatch(logout())
    //         }else{
    //             const userId = localStorage.getItem('userId')
    //             dispatch(authSuccess(token,userId))
    //             dispatch(authTimeout((expireTime.getTime() - new Date().getTime()) / 1000))
    //         }
    // }
    // }

    return{
        type: actionTypes.AUTH_CHECK_SIGNUP_SAGA
    }
}