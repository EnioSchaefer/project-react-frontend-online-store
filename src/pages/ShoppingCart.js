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

    if (localData) {
      const filteredData = localData
        .filter((id, index) => localData.indexOf(id) === index);
      filteredData.forEach(async (id) => {
        const response = await getProductById(id);
        this.setState((prevState) => ({
          cartObjects: [...prevState.cartObjects, response] }));
      });
    }
    this.setState({ totalCart: localData });
  }

  getOccurrence = (array, value) => {
    let count = 0;
    array.forEach((v) => {
      if (v === value) count += 1;
    });
    return count;
  };

  render() {
    const { cartObjects, totalCart } = this.state;
    if (!cartObjects) {
      return <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h3>;
    }
    return (
      <>
        {cartObjects.map((obj, index) => (
          <span key={ index }>
            <img src={ obj.thumbnail } alt={ obj.title } />
            <p data-testid="shopping-cart-product-name">{obj.title}</p>
            <p data-testid="shopping-cart-product-quantity">
              {this.getOccurrence(totalCart, obj.id)}
            </p>
          </span>
        ))}
      </>
    );
  }
}
