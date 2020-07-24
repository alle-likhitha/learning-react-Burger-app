import * as actionTypes from '../action/actionTypes';
import {takeEvery} from 'redux-saga/effects';
import {logoutSaga ,authTimeoutSaga ,authuserSaga, authCheckSignupSaga} from './auth';
import {initIngredientSaga} from './burgerBuilder';
import {purhaseBurgerStartSaga, orderFetchSaga} from './order';
export function* watchAuth (){
    yield takeEvery(actionTypes.AUTH_INITIAL_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_TIMEOUT_SAGA, authTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_USER_SAGA, authuserSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_SIGNUP_SAGA, authCheckSignupSaga);
}

export function* watchBurgerBuilder (){
    yield takeEvery(actionTypes.INIT_INGREDIENT_SAGA, initIngredientSaga);
    
}
export function* watchOrder (){
    yield takeEvery(actionTypes.PURCHASE_START_SAGA, purhaseBurgerStartSaga);
    yield takeEvery(actionTypes.ORDER_FETCH_SAGA, orderFetchSaga)
}