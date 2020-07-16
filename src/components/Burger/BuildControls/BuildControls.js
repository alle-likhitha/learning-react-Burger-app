import React from 'react';
import classes from './BuildControls.module.css';
import BuildCont from './BuildCont/BuildCont';

const controls = [
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'}
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Price = <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildCont key = {ctrl.label} 
            label={ctrl.label}
            added = {()=>props.addingredient(ctrl.type)}
            remove = {()=>props.removeingredient(ctrl.type)}
            disable = {props.disable[ctrl.type]}
            />
        ))}
        <button className={classes.OrderButton} disabled={!props.purchase}
        onClick={props.order}>ORDER NOW</button>
    </div>
);

export default buildControls;