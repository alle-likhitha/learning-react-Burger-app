import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleDrawer from '../SideDrawer/ToggleDrawer/ToggleDrawer'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
            <ToggleDrawer click={props.change}></ToggleDrawer>
        <div className={classes.Logo}>
        <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticate ={props.isAuth} />
        </nav>
    </header>
);


export default toolbar;