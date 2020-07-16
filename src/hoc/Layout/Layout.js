import React, { Component } from 'react';
import Aux from '../Aux/aux'
import classes from './Layout.module.css';
import ToolBar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    
    state={
        showSideDrawer : false
    }
    
    CloseSideDrawerHandler=()=>{
        this.setState({showSideDrawer:false});
    }
    openCloseHandler=()=>{
        if(this.state.showSideDrawer){
            this.setState({showSideDrawer:false})  
        }
        else{
            this.setState({showSideDrawer:true})
        }
    }
    
    render(){
        return(
            <Aux>
                <div>
                    <ToolBar change={this.openCloseHandler}/>
                    <SideDrawer open = {this.state.showSideDrawer} close={this.CloseSideDrawerHandler}/>
                </div>
                <main className={classes.Space}>
                {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;