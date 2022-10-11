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

  componentWillUnmount() {
    this.setState({ categories: [] });
  }

  handleClick = (event) => {
    const value = event.target.getAttribute('value');

    const { history } = this.props;
    history.push(`/product/${value}`);
  };

  render() {
    const { categories } = this.state;
    return (
      <>
        {categories.map((obj, index) => (
          <div
            data-testid="product"
            key={ index }
          >
            <p className={ obj.id }>{obj.title}</p>
            <img value={ obj.id } src={ obj.thumbnail } alt={ obj.title } />
            <p value={ obj.id }>{`${obj.price}`}</p>
            <button
              data-testid="product-detail-link"
              onClick={ this.handleClick }
              type="button"
              value={ obj.id }
            >
              Detalhes
            </button>
          </div>
        ))}
      </>
    );
  }
}

export default Categories;
Categories.propTypes = {
  match: PropTypes.shape.isRequired,
  history: PropTypes.shape.isRequired,
};
