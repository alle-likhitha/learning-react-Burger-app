import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/CheckOut/Checkout';
import {Route, Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Authentication from './containers/Authentication/Authentication';

class App extends Component {
  render(){
    return (
      <div>
        <Layout>
          {/* <BurgerBuilder></BurgerBuilder> */}
          <Switch>
          <Route path='/orders' component={Orders} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/authentication' component={Authentication} />
          <Route path='/' exact component={BurgerBuilder}/>
          {/* <Checkout/> */}
          </Switch>
          
        </Layout>
      </div>
    );
  }
}

export default App;
