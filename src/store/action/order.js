import * as actionTypes from './actionTypes';
// import axios from '../../axios-order';



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
export const purhaseBurgerStart = (orderData,token)=>{
    return{
        type:actionTypes.PURCHASE_START_SAGA,
        orderData:orderData,
        token:token
    }
}

export const orderFetchSuccess = (orders)=>{
    return {
        type:actionTypes.ORDER_FETCH_SUCCESS,
        orders:orders
    }
}

export const orderFetchFail = (error)=>{
    return{
        type:actionTypes.ORDER_FETCH_FAIL,
        error:error
    }
}
export const orderFetchStart = () => {
    return{
        type:actionTypes.ORDER_FETCH_START
    }
}
export const orderFetch = (token, userId)=>{
        // dispatch(orderFetchStart())
        // const queryParams = '?auth=' + token +'&orderBy="userId"&equalTo="' + userId +'"';
        // axios.get('/orders.json'+queryParams)
        // .then(res=>{
        //     const fetchOrder = [];
        //     for(let key in res.data){
        //         fetchOrder.push({
        //             ...res.data[key],
        //             id:key})
        //     }
        //     dispatch(orderFetchSuccess(fetchOrder))
        //     // this.setState({loading:false, orders:fetchOrder})
        // })
        // .catch(err=>{
        //     // this.setState({loading:false})
        //     dispatch(orderFetchFail(err));
        // })
    
    return{
        type:actionTypes.ORDER_FETCH_SAGA,
        token:token,
        userId: userId
    }
       
    
}