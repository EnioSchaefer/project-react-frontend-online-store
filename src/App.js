import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" render={ (props) => <Home { ...props } /> } />
      <Route exact path="/shoppingcart" component={ ShoppingCart } />
    </BrowserRouter>
  );
}

export default App;
