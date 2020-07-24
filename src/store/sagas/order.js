import {put} from 'redux-saga/effects';
import * as actions from '../action/index';
import axios from '../../axios-order';

export function* purhaseBurgerStartSaga(action){
    try{
        yield put(actions.purchaseStart());
        const response =yield axios.post('/orders.json?auth='+action.token,action.orderData)
        yield put(actions.purchaseBurgerSuccess(response.data.name , action.orderData))
    }    
    catch(error){
        yield put(actions.purchaseBurgerFail(error));
    }
}

export function* orderFetchSaga(action){
    try{
        yield put(actions.orderFetchStart())
        const queryParams = '?auth=' + action.token +'&orderBy="userId"&equalTo="' + action.userId +'"';
        const res =yield axios.get('/orders.json'+queryParams)
        const fetchOrder = [];
        for(let key in res.data){
            fetchOrder.push({
                ...res.data[key],
                id:key})
        }
        yield put(actions.orderFetchSuccess(fetchOrder))
    }    
            // this.setState({loading:false, orders:fetchOrder})
    catch(err){
        yield put(actions.orderFetchFail(err));
    }
            // this.setState({loading:false})
    
}
