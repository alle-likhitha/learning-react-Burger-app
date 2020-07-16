import React ,{Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';
import {connect } from 'react-redux'
// import Spinner from '../../components/UI/Spinner/Spinner'
class Checkout extends Component{

    // componentWillMount(){
    //     console.log('checkout:::'+this.props);
    //     const query = new URLSearchParams(this.props.location.search);
    //     let ingredients={};
    //     let price = 0;
    //     for(let i of query.entries()){
    //         if (i[0] === 'price'){
    //             price=i[1];
    //         }
    //         else{
    //             ingredients[i[0]]= +i[1];
    //         }
            
    //     }
    //     this.setState({ingredients:ingredients, price:price});

    // }


    cancelCheckHandler=()=>{
        this.props.history.goBack();
        console.log(this.props)
    }

    continueCheckHandler=()=>{
        this.props.history.replace('checkout/contact-data')
    }

    render(){
        return(
            <div>
              
                <CheckoutSummary ingredients={this.props.ings}
                cancelCheckout={this.cancelCheckHandler}
                continueCheckout={this.continueCheckHandler}/>
                <Route path={this.props.match.path +'/contact-data'} 
                    component={ContactData}/>
            </div>
        );
    }
}

const mapStatetoProps = state =>{
    return{
        ings: state.ingredients,
        price:state.totalPrice
    }
}


export default connect(mapStatetoProps)(Checkout);