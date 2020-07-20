import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/aux';

const sideDrawer = (props)=>{
    let attachesClasses = [classes.SideDrawer, classes.Close]
    if(props.open){
        attachesClasses = [classes.SideDrawer, classes.Open]
    }
    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.close}/>
            <div className={attachesClasses.join(' ')} onClick={props.close}>
                <div className={classes.Logo} >
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticate ={props.isAuth} />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;