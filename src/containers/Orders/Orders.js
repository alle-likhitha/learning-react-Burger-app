import React, { Component } from 'react';
import Order from '../../components/Order/order'
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/action/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';



class Orders extends Component{
    
    // state={
    //     orders:[],
    //     loading:true

    // }

    componentDidMount(){
        // axios.get('/orders.json')
        // .then(res=>{
        //     const fetchOrder = [];
        //     for(let key in res.data){
        //         fetchOrder.push({
        //             ...res.data[key],
        //             id:key})
        //     }

        //     this.setState({loading:false, orders:fetchOrder})
        // })
        // .catch(err=>{
        //     this.setState({loading:false})
        // })
        this.props.onFetchOrders()
    }


    render(){
        let orders = <Spinner />
        if(!this.props.loading){
            orders= 
            <div>
                {this.props.orders.map(order=>(
                <Order ingredients={order.ingredients} 
                key={order.id}
                price={order.price}></Order>
                ))}
            </div>
            
        }
        return(
            <div>
                {orders}
                
            </div>
            
        );
    }
}
const mapStatetoProps = (state)=>{
    return{
        orders:state.order.orders,
        loading:state.order.loading
    }
}

const mapDispatchtoProps=(dispatch)=>{
return{
    onFetchOrders :() =>dispatch(actions.orderFetch())
}
}

export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(Orders, axios));