import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
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

  render() {
    const { searchInput } = this.state;

    return (
      <>
        <label htmlFor="searchInput">
          <input
            type="text"
            id="searchInput"
            name="searchInput"
            value={ searchInput }
            onChange={ this.handleChange }
          />
        </label>

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
      </>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
