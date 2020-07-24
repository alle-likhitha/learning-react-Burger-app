import React from 'react';
import classes from './order.module.css';
const order =(props)=>{
    const ing =[];
    for(const iname in props.ingredients){
        ing.push({ name:iname, amount:props.ingredients[iname]})
    }


    const ingOutput = ing.map(i =>{
    return <span 
    key={i.name}
    style={{
        textTransform:'capitalize',
        display:'inline-block',
        margin:'0 9px',
        padding:'5px',
        border:'1px solid black'

    }}> {i.name}   ({i.amount})</span>
    })
    return(
        <div className={classes.Order }>
        <p></p>
        <p>Ingredients : {ingOutput} </p>
        <p>Price: <strong>Rs {props.price}</strong></p>
        </div>
    );
 
};

export default order;