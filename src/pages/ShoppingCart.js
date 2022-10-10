import React, { Component } from 'react';
import { getProductById } from '../services/api';

export default class ShoppingCart extends Component {
  constructor() {
    super();

    this.state = {
      cartObjects: [],
    };
  }

  componentDidMount() {
    const localData = JSON.parse(localStorage.getItem('products'));
    const arr = [];

    localData.forEach(async (id) => {
      const response = await getProductById(id);
      arr.push(response);
    });
    this.setState({ cartObjects: arr });
  }

  render() {
    const { cartObjects } = this.state;
    console.log(cartObjects);
    if (cartObjects.length > 0) {
      return <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h3>;
    }
    return (
      <>
        {cartObjects.map((obj, index) => (
          <span key={ index }>
            <img src={ obj.thumbnail } alt={ obj.title } />
            <p data-testid="shopping-cart-product-name">{obj.title}</p>
            <p data-testid="shopping-cart-product-quantity">01</p>
          </span>
        ))}
      </>
    );
  }
}
