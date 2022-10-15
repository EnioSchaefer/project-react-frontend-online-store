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
    const localData = JSON.parse(localStorage.getItem(id));
    const response = await getProductById(id);
    this.setState({
      product: response,
      local: localData,
    });
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value, invalid: false });
  };

  handleClick = (e) => {
    e.preventDefault();
    const { match: { params: { id } } } = this.props;
    const { email: email2, texto, avaliation } = this.state;
    const local = JSON.parse(localStorage.getItem(id));
    const regex = /^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/;
    if (!regex.test(email2) || !avaliation) {
      this.setState({ invalid: true });
    } else if (!local) {
      localStorage.setItem(id, JSON.stringify([{
        email: email2,
        text: texto,
        rating: avaliation,
      }]));
      this.setState({ local: JSON.parse(localStorage.getItem(id)) });
      document.getElementById('form').reset();
    } else {
      localStorage.setItem(id, JSON.stringify([...local, {
        email: email2,
        text: texto,
        rating: avaliation,
      }]));
      this.setState({ local: JSON.parse(localStorage.getItem(id)) });
      document.getElementById('form').reset();
    }
  };

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
    const { product, invalid, local } = this.state;
    if (product) {
      return (
        <div className="product__classification">
          <div className="product__item">
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
              {`R$ ${product.price}`}
            </p>
            <button
              type="button"
              data-testid="product-detail-add-to-cart"
              onClick={ () => this.addToCart(product) }
            >
              Adicionar ao Carrinho
            </button>
          </div>
          <div className="classifications">
            <form onChange={ this.handleChange } id="form">
              <label htmlFor="email">
                <input
                  data-testid="product-detail-email"
                  name="email"
                  id="email"
                  placeholder="Email"
                />
              </label>
              <div className="option__avaliation">
                <input
                  name="avaliation"
                  value="1"
                  data-testid="1-rating"
                  type="radio"
                />
                <input
                  name="avaliation"
                  value="2"
                  data-testid="2-rating"
                  type="radio"
                />
                <input
                  name="avaliation"
                  value="3"
                  data-testid="3-rating"
                  type="radio"
                />
                <input
                  name="avaliation"
                  value="4"
                  data-testid="4-rating"
                  type="radio"
                />
                <input
                  name="avaliation"
                  value="5"
                  data-testid="5-rating"
                  type="radio"
                />
              </div>
              <label htmlFor="msg">
                <textarea
                  placeholder="Detalhes da avalização do produto"
                  name="texto"
                  data-testid="product-detail-evaluation"
                  id="msg"
                />
              </label>
              <button
                onClick={ this.handleClick }
                data-testid="submit-review-btn"
                type="submit"
              >
                Enviar
              </button>
              {invalid && <span data-testid="error-msg">Campos inválidos</span>}
            </form>
            {local && (
              local.map((obj, i) => (
                <div key={ i }>
                  <p data-testid="review-card-email">{obj.email}</p>
                  <p data-testid="review-card-rating">{obj.rating}</p>
                  <p data-testid="review-card-evaluation">{obj.text}</p>
                </div>
              )))}
          </div>
        </div>
      );
    }
  }
}

Product.propTypes = {
  match: PropTypes.shape.isRequired,
};
