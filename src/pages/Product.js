import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  handleClick = () => {
    const { history } = this.props;
    history.push('/shoppingcart');
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
            onClick={ this.handleClick }
            type="button"
            data-testid="shopping-cart-button"
          >
            Comprar

          </button>
        </div>
      );
    }
  }
}

Product.propTypes = {
  history: PropTypes.shape.isRequired,
  match: PropTypes.shape.isRequired,
};
