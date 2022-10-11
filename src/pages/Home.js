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

  handleClick = () => {
    const { history } = this.props;
    const historyFix = history;

    historyFix.push('/shoppingcart');
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

        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="shopping-cart-button"
        >
          Carrinho de Compras
        </button>

        {foundResult && <p>Nenhum produto foi encontrado</p>}
        <div>
          {searchResult.map((obj, index) => (
            <span key={ index } data-testid="product">
              <p>{obj.title}</p>
              <img src={ obj.thumbnail } alt={ obj.title } />
              <p>{ `${obj.price}${obj.currency}` }</p>
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
