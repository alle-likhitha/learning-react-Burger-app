import React, {useEffect, Suspense} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/CheckOut/Checkout';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
// import Orders from './containers/Orders/Orders';
// import Authentication from './containers/Authentication/Authentication';
import Logout from './containers/Authentication/Logout/logout';
import {connect} from 'react-redux';
// import asyncComponent from './hoc/AsyncComponent/asyncComponent';
import * as actions from './store/action/index';

const Checkout = React.lazy(()=>{
  return import('./containers/CheckOut/Checkout');
})
const Authentication = React.lazy(()=>{
  return import('./containers/Authentication/Authentication')
})
const Orders = React.lazy(()=>{
  return import('./containers/Orders/Orders')
})

const App = props => {
  
useEffect(()=>{
  props.onAuthCheckSignUp();
},[props]);
useEffect(() => {
  console.log('useEffect called');
});

  let routes = (
      <Switch>
        <Route path='/authentication' render={(props)=> <Authentication {...props}/>} />
        <Route path='/' exact component={BurgerBuilder}/>
        <Redirect to='/' />
      </Switch>
  );
if(props.isAuthenticated){
  routes = (
    <Switch>
      <Route path='/orders' render={(props)=> <Orders {...props}/>} />
      <Route path='/checkout' render={(props)=> <Checkout {...props}/>} />
      <Route path='/authentication' render={(props)=> <Authentication {...props}/>} />
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
          <Suspense fallback={<p>...Loading</p>}>
          {routes}
          </Suspense>
        </Layout>
      </div>
  );
  
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
