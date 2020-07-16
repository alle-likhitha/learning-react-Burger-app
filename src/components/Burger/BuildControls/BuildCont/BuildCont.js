import React from 'react';
import classes from './BuildCont.module.css';

const buildCont =(props)=>(
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} onClick={props.remove} disabled = {props.disable}>Less</button>
        
        <button className={classes.More} onClick={props.added}>Add</button>
    </div>
);

export default buildCont;