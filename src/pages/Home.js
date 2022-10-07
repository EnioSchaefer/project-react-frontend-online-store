import React, { Component } from 'react';

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
      </>
    );
  }
}
