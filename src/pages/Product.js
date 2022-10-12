import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getProductById } from '../services/api';

export default class Product extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getProductById(id);
    this.setState({ product: response });
  }

  addToCart = (item) => {
    const localData = JSON.parse(localStorage.getItem('products'));
    if (!localData) {
      const itemWithQuantity = {
        ...item,
        quantity: 1,
      };
      localStorage.setItem('products', JSON.stringify([itemWithQuantity]));
    } else if (localData.find((obj) => obj.id === item.id)) {
      const find = localData.find((obj) => obj.id === item.id);
      const index = localData.indexOf(find);
      find.quantity += 1;
      localData[index] = find;
      localStorage.setItem('products', JSON.stringify(localData));
    } else {
      const itemWithQuantity = {
        ...item,
        quantity: 1,
      };
      localStorage.setItem('products', JSON.stringify([...localData, itemWithQuantity]));
    }
  };

  render() {
    const { product } = this.state;
    console.log(product);
    if (product) {
      return (
        <div>
          <p data-testid="product-detail-name">{product.title}</p>
          <img
            data-testid="product-detail-image"
            value={ product.id }
            src={ product.thumbnail }
            alt={ product.title }
          />
          <p
            data-testid="product-detail-price"
            value={ product.id }
          >
            {`${product.price}`}
          </p>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => this.addToCart(product) }
          >
            Adicionar ao Carrinho
          </button>
        </div>
      );
    }
  }
}

Product.propTypes = {
  match: PropTypes.shape.isRequired,
};
