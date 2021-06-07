import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from '../Navbar/Navbar';
import Home from '../../views/Home';
import Products from '../../views/Products';
import Categories from '../../views/Categories';
import ProductPage from '../../views/ProductView';

const App = () => {
  return (
    <>
      <Navbar />
      <div className='container'>
        <Router>
          <Switch>
            <Route
              path={`/products/search`}
              exact
              render={(props) => {
                return <Products {...props} context='search' />;
              }}
              context='search'></Route>
            <Route path='/' exact component={Home}></Route>
            <Route
              path={`/products/:category`}
              exact
              component={Products}></Route>
            <Route
              path={`/product/:category/:subcategory?/:productId`}
              exact
              component={ProductPage}></Route>
            <Route path='/categories' exact component={Categories}></Route>
          </Switch>
        </Router>
      </div>
    </>
  );
};

export default App;
