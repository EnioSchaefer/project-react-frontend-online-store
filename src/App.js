import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SideBar from './components/SideBar';
import ShoppingCart from './pages/ShoppingCart';
import Categories from './pages/Categories';
import Product from './pages/Product';
import Checkout from './pages/Checkout';

function App() {
  return (
    <BrowserRouter>
      <SideBar />
      <Route
        exact
        path="/categories/:id"
        component={ Categories }
      />
      <Route exact path="/" render={ (props) => <Home { ...props } /> } />
      <Route exact path="/shoppingcart" component={ ShoppingCart } />
      <Route exact path="/product/:id" component={ Product } />
      <Route exact path="/checkout" component={ Checkout } />
    </BrowserRouter>
  );
}

export default App;
