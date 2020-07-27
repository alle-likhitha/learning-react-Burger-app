import React, { useState } from 'react';
import Aux from '../Aux/aux'
import classes from './Layout.module.css';
import ToolBar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

const Layout = props =>{
    
    const [showSideDrawer, setshowSideDrawer] = useState(false)
    
    const CloseSideDrawerHandler=()=>{
        setshowSideDrawer(false)
    }
    const openCloseHandler=()=>{
       setshowSideDrawer(!showSideDrawer)
    }
    
    return(
            <Aux>
                <div>
                    <ToolBar isAuth={props.isAuthenticated} change={openCloseHandler}/>
                    <SideDrawer isAuth={props.isAuthenticated} open = {showSideDrawer} close={CloseSideDrawerHandler}/>
                </div>
                <main className={classes.Space}>
                {props.children}
                </main>
            </Aux>
        );
}
const mapStatetoProps =state=>{
    return{
        isAuthenticated: state.auth.tokenId != null
    }
}
export default connect(mapStatetoProps)(Layout);