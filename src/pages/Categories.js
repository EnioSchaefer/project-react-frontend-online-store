import React from 'react';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      categoriesUpdated: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getProductsFromCategoryAndQuery(id, null);
    this.setState({ categories: response.results });
    this.setState({ categoriesUpdated: id });
  }

  async componentDidUpdate() {
    const { match: { params: { id } } } = this.props;
    // const { id } = match.params;
    // const newId = id;
    const { categoriesUpdated } = this.state;
    const response = await getProductsFromCategoryAndQuery(id, null);
    if (id !== categoriesUpdated) {
      this.setState({ categories: response.results });
      this.setState({ categoriesUpdated: id });
    }
  }

  addToCart = (event) => {
    const id = event.target.value;
    const localData = JSON.parse(localStorage.getItem('products'));
    if (!localData) {
      localStorage.setItem('products', JSON.stringify([id]));
    } else {
      localStorage.setItem('products', JSON.stringify([...localData, id]));
    }
  };

  render() {
    const { categories } = this.state;
    return (
      <>
        {categories.map((obj, index) => (
          <span key={ index } data-testid="product">
            <p>{obj.title}</p>
            <img src={ obj.thumbnail } alt={ obj.title } />
            <p>{`${obj.price}${obj.currency}`}</p>
            <button
              type="button"
              data-testid="product-add-to-cart"
              value={ obj.id }
              onClick={ this.addToCart }
            >
              Adicionar ao Carrinho
            </button>
          </span>
        ))}
      </>
    );
  }
}

export default Categories;
Categories.propTypes = {
  match: PropTypes.shape.isRequired,
};
