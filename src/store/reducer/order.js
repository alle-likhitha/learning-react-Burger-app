import * as actionTypes from '../action/actionTypes';
import {updateObject} from '../../hoc/Shared/utility';

const initialState ={
    orders:[],
    loading:false,
    purchased: false
}

const purchaseinit= (state,action)=>{
    return updateObject(state, {purchased:false})
}
const purchasestart= (state,action)=>{
    return updateObject(state,{loading:true})
}
const purchaseSuccess= (state,action)=>{
    const newOrder = {
        ...action.orderData,
        id:action.orderId
    }
    const updateobj = {loading:false,
        purchased:true,
        orders: state.orders.concat(newOrder)}
    return updateObject(state, updateobj)
}
const purchaseFail= (state,action)=>{
    return updateObject(state,{loading:false})
}
const orderFetchstart= (state,action)=>{
    return updateObject(state,{loading:true})
}
const orderSuccess= (state,action)=>{
    return updateObject(state,{loading:false,
        orders:action.orders})
}
const orderFail= (state,action)=>{
    return updateObject(state,{loading:false})
}

const reducer = (state=initialState,action)=>{

    switch(action.type){
        case actionTypes.PURCHASE_INIT: return purchaseinit(state,action)
         
        case actionTypes.PURCHASE_START: return purchasestart(state,action)
            
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseSuccess(state,action)
            
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseFail(state,action)
            
        case actionTypes.ORDER_FETCH_START: return orderFetchstart(state,action)
           
        case actionTypes.ORDER_FETCH_SUCCESS: return orderSuccess(state,action)
            
        case actionTypes.ORDER_FETCH_FAIL: return orderFail(state,action)
            
        default: return state     
    }
}

export default reducer;