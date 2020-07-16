import React,{ Component } from 'react';
import Aux from '../../hoc/Aux/aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Model from '../../components/UI/Model/Model';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/action/index';
import { connect } from 'react-redux';

// const INGREDIENTS_PRICE={
//         salad:20,
//         bacon:20,
//         cheese:30,
//         meat:40
// };

class BurgerBuilder extends Component{
    
    

    state = {
    // ingredients:null,
    // totalPrice:50,
    // purchasable:false,
    OrderClicked:false,
    
    }

    componentDidMount(){
        console.log(this.props)
        this.props.oninitIngredients()
    }
    componentDidUpdate(){
        console.log('Burgerbulider'+this.props.ings)
    }

    purchaseHandler = (ingredients) =>{
        const sum =Object.keys(ingredients).map( igKey => {
            return ingredients[igKey];
        })
        .reduce((sum ,el)=>{
            return sum+el;
        } ,0);
        // this.setState({purchasable: sum>0});
        return sum>0;
    }

    OrderClickedHandler = () =>{
        this.setState({OrderClicked:true});
    }

    cancelOrderHandler = () =>{
        this.setState({OrderClicked:false});
    }
    continueHandler = () =>{
        // alert('You Contine!!')
        
        // const query =[];
        // for (let i in this.state.ingredients){
        //     query.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]))
        // };
        // query.push('price='+ this.state.totalPrice)
        // console.log(query)
        
        // const queryStr = query.join('&');
        // console.log(queryStr)
        // this.props.history.push({
        //     pathname:'/checkout',
        //     search:'?'+queryStr
        // });
        this.props.oninitPurchased();
        this.props.history.push('/checkout')

    }

    // addIngredientHandler=(type)=>{
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount+1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type]=updatedCount;
    //     const priceAdd = INGREDIENTS_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAdd;
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     });
    //    this.purchaseHandler(updatedIngredients);
    // }


    // removeIngredientHandler=(type )=>{
    //     const rmoldCount = this.state.ingredients[type];
    //     if (rmoldCount <= 0){
    //         return;
    //     }
    //     let rmupdatedCount = rmoldCount - 1;
    //     const rmIngredients = {
    //         ...this.state.ingredients
    //     }
    //     //debugger
    //     rmIngredients[type] = rmupdatedCount;
    //     const priceDel = INGREDIENTS_PRICE[type];
    //     const rmPrice = this.state.totalPrice - priceDel;
    //     this.setState({
    //         totalPrice: rmPrice,
    //         ingredients: rmIngredients
    //     }); 
    //     this.purchaseHandler(rmIngredients);

    // }
    render(){

        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        //console.log(this.state.ingredients)
        let ordersummary=null;
        
        
        let burger =this.props.error ? <h2>Error! Ingredients not found!</h2> : <Spinner />;
        if (this.props.ings){
            burger =(
            <Aux>   
            <Burger ingredients={this.props.ings}/>
                <BuildControls addingredient ={this.props.onIngredientAdded} 
                removeingredient={this.props.onIngredientRemoved}
                disable = {disabledInfo}
                price={this.props.price}
                purchase={this.purchaseHandler(this.props.ings)}
                order = {this.OrderClickedHandler}
                />
            </Aux>     
            );
            ordersummary = <OrderSummary ingredients={this.props.ings} price={this.props.price} 
                            continue = {this.continueHandler}
                            cancel={this.cancelOrderHandler}/>    
                
        }

        return(
            <Aux>
                <Model show={this.state.OrderClicked} modelClosed={this.cancelOrderHandler}>
                    
                    {ordersummary}
                    
                </Model>
                {burger}
            </Aux>

        );
    }
}


const mapStatetoProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        purchased: state.order.purchased
    };
    
}

const mapDispatchtoProps = dispatch =>{
    return{
        onIngredientAdded : (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved : (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        oninitIngredients : ()=> dispatch(burgerBuilderActions.initIngredient()),
        oninitPurchased : () => dispatch(burgerBuilderActions.purchaseInit())
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(BurgerBuilder, axios));