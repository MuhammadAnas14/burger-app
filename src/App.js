import React from 'react';
import Layout from './hoc/Layout/layout'
import BurgerBuilder from './containers/BurgerBuilder/BugerBuilder'
import Checkout from './containers/Checkout/Checkout'


function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder>
          
        </BurgerBuilder>
        <Checkout />
      </Layout>
    </div>
  );
}

export default App;
