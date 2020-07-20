import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';
//import Aux from '../../hoc/aux'

const burger =(props)=>{
    // console.log(props.ingredients)
    let passedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey] )].map((_,i) => {
            return <BurgerIngredient key = {igKey+i} type={igKey} />
        });
    })
    .reduce((arr,el)=>{
        return arr.concat(el)
    },[]);

    if (passedIngredients.length === 0){
        passedIngredients = <p>Please Add Ingredients!</p>;
    }

    return(
        <div className={classes.Burger}>
                <BurgerIngredient type='bread-top'></BurgerIngredient>
                {passedIngredients}
                <BurgerIngredient type='bread-bottom'></BurgerIngredient>
                
        </div>
    );
};

export default burger;