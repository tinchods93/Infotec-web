import React, { Component, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from '../Navbar/Navbar';
import Home from '../../views/Home';
import Products from '../../views/Products';
import Categories from '../../views/Categories';
import ProductPage from '../../views/ProductView';
import { formatSearch } from '../../utils/stringFormatting';
import { ApiFunctions } from '../../utils/apifunctions';

const App = () => {
  // constructor() {
  //   super();
  //   this.state = {
  //     search: '',
  //   };

  //   this.handleKeyEvents = this.handleKeyEvents.bind(this);
  // }
  const [search, setSearch] = useState({});

  const memoizedHandleClick = useCallback(
    async (e) => {
      switch (e.key) {
        case 'Enter':
          e.preventDefault();
          // console.log(e.target.value);
          const _search = formatSearch(e.target.value);

          const searchResult = await ApiFunctions.SearchProducts(_search);
          console.log(searchResult);
          setSearch(searchResult);
          console.log(await search);
          break;
        default:
          break;
      }
    },
    [] // Tells React to memoize regardless of arguments.
  );

  const handleKeyEvents = async (e) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        const _search = formatSearch(e.target.value);

        const searchResult = await ApiFunctions.SearchProducts(_search);
        await this.setSearch(searchResult);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Navbar handleKeyEvents={memoizedHandleClick} />
      <div className='container'>
        <Router>
          <Switch>
            <Route
              path={`/products/search`}
              exact
              component={() => {
                <Products productList={this.state.search} />;
              }}></Route>
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
