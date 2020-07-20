import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/CheckOut/Checkout';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
// import Orders from './containers/Orders/Orders';
// import Authentication from './containers/Authentication/Authentication';
import Logout from './containers/Authentication/Logout/logout';
import {connect} from 'react-redux';
import asyncComponent from './hoc/AsyncComponent/asyncComponent';
import * as actions from './store/action/index';

const asyncCheckout = asyncComponent(()=>{
  return import('./containers/CheckOut/Checkout');
})
const asyncAuthentication = asyncComponent(()=>{
  return import('./containers/Authentication/Authentication')
})
const asyncOrders = asyncComponent(()=>{
  return import('./containers/Orders/Orders')
})

class App extends Component {
  
  componentDidMount(){
    this.props.onAuthCheckSignUp()
  }
  
 
  render(){
    let routes = (
      <Switch>
        <Route path='/authentication' component={asyncAuthentication} />
        <Route path='/' exact component={BurgerBuilder}/>
        <Redirect to='/' />
      </Switch>
    );
if(this.props.isAuthenticated){
  routes = (
    <Switch>
      <Route path='/orders' component={asyncOrders} />
      <Route path='/checkout' component={asyncCheckout} />
      <Route path='/authentication' component={asyncAuthentication} />
      <Route path='/logout' exact component={Logout}/>
      <Route path='/' exact component={BurgerBuilder}/>
      <Redirect to='/' />
          {/* <Checkout/> */}
    </Switch>
  );
}

    return (
      <div>
        <Layout>
          {/* <BurgerBuilder></BurgerBuilder> */}
          {routes}
          
        </Layout>
      </div>
    );
  }
}
const mapStatetoProps = state=>{
  return{
    isAuthenticated : state.auth.tokenId
  }
}
const mapDispatchtoProps = dispatch=>{
  return{
    onAuthCheckSignUp : ()=> dispatch(actions.authCheckSignup())
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchtoProps)(App));
