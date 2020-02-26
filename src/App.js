import React from 'react';
import Layout from './hoc/Layout/layout'
import BurgerBuilder from './containers/BurgerBuilder/BugerBuilder'
import Checkout from './containers/Checkout/Checkout'
import {Route , Switch} from 'react-router-dom'

function App() {
  return (
    <div>
      <Layout>
        <Switch>
        <Route path = '/checkout' component = {Checkout} />
        <Route path='/' exact component = {BurgerBuilder} />
        </Switch>
  
      </Layout>
    </div>
  );
}

export default App;
