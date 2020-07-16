import * as actionTypes from './actionTypes';
import axios from '../../axios-order';
// import order from '../../components/Order/order';

export const purchaseBurgerSuccess =(id, orderData)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}

export const purchaseBurgerFail = (error) =>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const purchaseStart = ()=>{
    return{
        type: actionTypes.PURCHASE_START
    }
}

export const purchaseInit = ()=>{
    return{
        type:actionTypes.PURCHASE_INIT
    }
}
export const purhaseBurgerStart = (orderData)=>{
    return dispatch =>{
        dispatch(purchaseStart());
        axios.post('/orders.json',orderData)
            .then(response=>{
                console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data.name,orderData))

            })
            .catch(error => {
                console.log(error)
                dispatch(purchaseBurgerFail(error));
                
            }
            )
    }
}