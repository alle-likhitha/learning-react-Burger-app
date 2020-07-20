import * as actionTypes from '../action/actionTypes';
import {updateObject} from '../../hoc/Shared/utility';

const initialState = {
    tokenId:null,
    userId:null,
    error: null,
    loading: null,
    authRedirect: '/'
};

const onAuthStart = (state, action )=>{
    return updateObject(state, {loading: true, error:false})
};

const onAuthSuccess = (state, action)=>{
    return updateObject(state, {
        tokenId:action.idToken,
        userId:action.localId,
        loading:false,
        error:null
    });
};
const onAuthRedirect = (state,action)=>{
    return updateObject(state,{authRedirect:action.path})
}

const onAuthFail = (state,action)=>{
    return updateObject(state,{error:action.error, loading:false})
};
const onAuthLogout = (state,action)=>{
    return updateObject(state,{tokenId:null,userId:null})
};

const reducer =(state= initialState, action)=>{
    switch(action.type){
        case actionTypes.AUTH_START: return onAuthStart(state,action);
        case actionTypes.AUTH_SUCCESS: return onAuthSuccess(state,action);
        case actionTypes.AUTH_FAIL: return onAuthFail(state,action);
        case actionTypes.AUTH_LOGOUT:return onAuthLogout(state,action);
        case actionTypes.AUTH_REDIRECT_PATH: return onAuthRedirect(state,action)
        default: return state;    
    };
};

export default reducer;