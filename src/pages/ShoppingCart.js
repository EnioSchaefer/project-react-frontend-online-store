import React, { Component } from 'react';

export default class ShoppingCart extends Component {
  render() {
    return (
      <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h3>
    );
  }
}