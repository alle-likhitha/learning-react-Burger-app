import React from 'react';
import classes from './NavItem.module.css';
import { NavLink } from 'react-router-dom';


const navItems = (props) =>(
    <li className={classes.NavItem}>
        <NavLink activeClassName={classes.active} to={props.link} exact >{props.children}</NavLink>
    </li>
);

export default navItems;