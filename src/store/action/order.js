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
export const purhaseBurgerStart = (orderData,token)=>{
    return dispatch =>{
        dispatch(purchaseStart());
        axios.post('/orders.json?auth='+token,orderData)
            .then(response=>{
                // console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data.name,orderData))

            })
            .catch(error => {
                console.log(error)
                dispatch(purchaseBurgerFail(error));
                
            }
            )
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
    return dispatch=>{
        dispatch(orderFetchStart())
        const queryParams = '?auth=' + token +'&orderBy="userId"&equalTo="' + userId +'"';
        axios.get('/orders.json'+queryParams)
        .then(res=>{
            const fetchOrder = [];
            for(let key in res.data){
                fetchOrder.push({
                    ...res.data[key],
                    id:key})
            }
            dispatch(orderFetchSuccess(fetchOrder))
            // this.setState({loading:false, orders:fetchOrder})
        })
        .catch(err=>{
            // this.setState({loading:false})
            dispatch(orderFetchFail(err));
        })
    }
       
    
}