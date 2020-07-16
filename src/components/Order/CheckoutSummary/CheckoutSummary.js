import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css'
const checkoutSummary=(props)=>{
    return(
        <div className={classes.CheckoutSummary}>
            <h1>Yey It tastes GOOD! </h1>
            <div style={{height:'600px', width:'100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients} />

            </div>
            <Button clicked= {props.cancelCheckout} btntype='Danger'>CANCEL</Button>
            <Button clicked={props.continueCheckout} btntype='Success'>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;