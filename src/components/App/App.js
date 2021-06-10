import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { LocalStorageFunctions } from '../../utils/localStorageFunctions';
import Navbar from '../Navbar/Navbar';
import Home from '../../views/Home';
import Products from '../../views/Products';
import Categories from '../../views/Categories';
import ProductPage from '../../views/ProductView';
import ShoppingCart from '../../views/ShoppingCart';

export default class App extends Component {
  constructor() {
    super();
    this.addCartItem = this.addCartItem.bind(this);
  }

  addCartItem(product) {
    console.log('ADD', product);
    LocalStorageFunctions.addShoppingCartProduct(product);
  }

  render() {
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
                }}></Route>
              <Route path='/' exact component={Home}></Route>
              <Route
                path='/shoppingCart'
                exact
                render={(props) => {
                  return (
                    <ShoppingCart {...props} addCartItem={this.addCartItem} />
                  );
                }}></Route>
              <Route
                path={`/products/:category`}
                exact
                component={Products}></Route>
              <Route
                path={`/product/:category/:subcategory?/:productId`}
                exact
                render={(props) => {
                  return (
                    <ProductPage {...props} addCartItem={this.addCartItem} />
                  );
                }}></Route>
              <Route path='/categories' exact component={Categories}></Route>
            </Switch>
          </Router>
        </div>
      </>
    );
  }
}
