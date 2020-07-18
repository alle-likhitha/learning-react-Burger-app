import React,{Component} from 'react';
import * as actions from '../../../store/action/index';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';



class Logout extends Component{
    componentDidMount(){
        this.props.onLogout();
    }
    render(){
        return <Redirect to ='/' />;
    };
};

const mapDispatchtoProps=dispatch=>{
    return{
        onLogout:()=>dispatch(actions.logout())
    }
}

export default connect(null,mapDispatchtoProps)(Logout);