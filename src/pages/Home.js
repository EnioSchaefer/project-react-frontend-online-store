import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      searchResult: [],
      foundResult: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  // Responsavel por realizar acoes do botao de pesquisa
  buttonSearch = async () => {
    const { searchInput } = this.state;
    const response = await getProductsFromCategoryAndQuery(null, searchInput);

    const { results } = response;

    if (results.length === 0) this.setState({ foundResult: true });
    const objResults = results.map((obj) => (
      {
        title: obj.title,
        price: obj.price,
        currency: obj.currency_id,
        thumbnail: obj.thumbnail,
      }
    ));
    this.setState({
      searchResult: objResults,
    });
  };

  handleClick = (event) => {
    const value = event.target.getAttribute('value');

    const { history } = this.props;
    const historyFix = history;
    historyFix.push(`/product/${value}`);
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
    const { searchInput, searchResult, foundResult } = this.state;
    return (
      <>
        <label htmlFor="searchInput">
          <input
            type="text"
            id="searchInput"
            name="searchInput"
            value={ searchInput }
            onChange={ this.handleChange }
            data-testid="query-input"
          />
        </label>

        <button
          type="button"
          onClick={ this.buttonSearch }
          data-testid="query-button"
        >
          Pesquisar
        </button>

        {searchInput === ''
          && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )}

        {foundResult && <p>Nenhum produto foi encontrado</p>}
        <div>
          {searchResult.map((obj, index) => (
            <span key={ index } data-testid="product">
              <p>{obj.title}</p>
              <img src={ obj.thumbnail } alt={ obj.title } />
              <p>{ `${obj.price}${obj.currency}` }</p>
              <button
                type="button"
                data-testid="product-add-to-cart"
                onClick={ () => this.addToCart(obj) }
              >
                Adicionar ao Carrinho
              </button>
              <button
                data-testid="product-detail-link"
                onClick={ this.handleClick }
                type="button"
                value={ obj.id }
              >
                Detalhes
              </button>
            </span>
          ))}
        </div>
      </>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
