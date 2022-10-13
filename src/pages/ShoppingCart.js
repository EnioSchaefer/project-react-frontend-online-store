import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

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
      this.setState(({
        cartObjects: localData,
      }));
    }
  }

  increaseItem = (itemsList, index) => {
    itemsList[index].quantity += 1;
    localStorage.setItem('products', JSON.stringify(itemsList));
    this.setState(({
      cartObjects: itemsList,
    }));
  };

  decreaseItem = (itemsList, index) => {
    if (itemsList[index].quantity > 1) {
      itemsList[index].quantity -= 1;
      localStorage.setItem('products', JSON.stringify(itemsList));
      this.setState(({
        cartObjects: itemsList,
      }));
    }
  };

  removeProduct = (itemsList, index) => {
    const filteredList = itemsList.filter((item) => item !== itemsList[index]);
    localStorage.setItem('products', JSON.stringify(filteredList));
    this.setState(({
      cartObjects: filteredList,
    }));
  };

  render() {
    const { cartObjects } = this.state;
    if (cartObjects.length === 0) {
      return <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h3>;
    }
    return (
      <>
        {cartObjects.map((obj, index) => (
          <div key={ index }>
            <img src={ obj.thumbnail } alt={ obj.title } />
            <p data-testid="shopping-cart-product-name">{obj.title}</p>
            <button
              type="button"
              data-testid="product-decrease-quantity"
              onClick={ () => this.decreaseItem(cartObjects, index) }
            >
              -
            </button>
            <span data-testid="shopping-cart-product-quantity">
              {obj.quantity}
            </span>
            <button
              type="button"
              data-testid="product-increase-quantity"
              onClick={ () => this.increaseItem(cartObjects, index) }
            >
              +
            </button>
            <br />
            <br />
            <button
              type="button"
              data-testid="remove-product"
              onClick={ () => this.removeProduct(cartObjects, index) }
            >
              Remover Item
            </button>
          </div>
        ))}
        <NavLink to="/checkout" data-testid="checkout-products">
          Finalizar Compra
        </NavLink>
      </>
    );
  }
}
