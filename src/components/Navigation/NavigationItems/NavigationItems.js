import React from 'react';
import classes from './NavigationItems.module.css';
import NavItem from './NavItem/NavItem'

const navigationItems = (props) =>(
    <ul className={classes.NavigationItems}>
        <NavItem link='/' exact={props.exact}>
            Burger Builder</NavItem>
        <NavItem link='/orders'>
            Orders</NavItem>
        {!props.isAuthenticate ? <NavItem link='/authentication'>Authentication</NavItem>
            : <NavItem link='/logout'>Logout</NavItem>}

    </ul>
);

export default navigationItems;