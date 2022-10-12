import React, { Component } from 'react';

export default class ShoppingCart extends Component {
  constructor() {
    super();

    this.state = {
      cartObjects: [],
    };
  }

  componentDidMount() {
    const { cartObjects } = this.state;
    const localData = JSON.parse(localStorage.getItem('products'));

    if (localData) {
      this.setState(({
        cartObjects: localData,
      }));
      console.log(cartObjects);
    }
  }

  render() {
    const { cartObjects } = this.state;
    if (cartObjects.length === 0) {
      return <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h3>;
    }
    return (
      <>
        {cartObjects.map((obj, index) => (
          <span key={ index }>
            <img src={ obj.thumbnail } alt={ obj.title } />
            <p data-testid="shopping-cart-product-name">{obj.title}</p>
            <p data-testid="shopping-cart-product-quantity">
              {obj.quantity}
            </p>
          </span>
        ))}
      </>
    );
  }
}
