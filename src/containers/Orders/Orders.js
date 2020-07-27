import React, { useEffect } from 'react';
import Order from '../../components/Order/order'
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/action/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';


const Orders = props =>{
    
    useEffect(() => {
        props.onFetchOrders(props.token, props.userId)
    // eslint-disable-next-line    
    },[])

        let orders = <Spinner />
        if(!props.loading){
            orders= props.orders.map(order=>(
                <Order ingredients={order.ingredients} 
                key={order.id}
                price={order.price}></Order>
                ))
            
        }
        return(
            <div>
                {orders}
                
            </div>
            
        );

}
const mapStatetoProps = (state)=>{
    return{
        orders:state.order.orders,
        loading:state.order.loading,
        token:state.auth.tokenId,
        userId: state.auth.userId
    }
}

const mapDispatchtoProps=(dispatch)=>{
return{
    onFetchOrders :(token, userId) =>dispatch(actions.orderFetch(token, userId))
}
}

export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(Orders, axios));