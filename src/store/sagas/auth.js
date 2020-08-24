import {put, delay} from 'redux-saga/effects';
// import * as actionTypes from '../action/actionTypes';
import * as actions from '../action/index';
import axios from 'axios'
export function* logoutSaga(action){
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expireTime');
    yield localStorage.removeItem('userId')
    yield put(actions.logoutSucceed())
}

export function* authTimeoutSaga(action){
    yield delay(action.expiretime * 1000)
    yield put(actions.logout())

    // return dispatch=>{
    //     setTimeout(()=>{
    //         dispatch(logout())
    //     },expiretime*1000)
    // }
}

export function* authuserSaga(action){

    yield put(actions.authStart())
    const authData = {
        email: action.email,
        password: action.password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='add ypur database key'';
        if(!action.isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='add ypur database key'';
        }
        try{
        const response = yield axios.post(url, authData)
        console.log(response)
        const expirationTime =yield new Date(new Date().getTime() + response.data.expiresIn * 1000)
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expireTime', expirationTime);
        yield localStorage.setItem('userId',response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId))
        yield put(actions.authTimeout(response.data.expiresIn))
        }    
        
        catch(error){
                // console.log(error)
                // console.log(error.response)
                yield put(actions.authFail(error.response.data.error.message))
            }
    }


    export function* authCheckSignupSaga(action){
            const token =yield localStorage.getItem('token');
            
            if(!token){
                yield put(actions.logout())
            }
            else{
                const expireTime =yield new Date(localStorage.getItem('expireTime'));
                if(expireTime <= new Date()){
                    yield put(actions.logout())
                }else{
                    const userId =yield localStorage.getItem('userId')
                    yield put(actions.authSuccess(token,userId))
                    yield put(actions.authTimeout((expireTime.getTime() - new Date().getTime()) / 1000))
                }
        }
}
