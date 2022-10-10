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

  render() {
    const { categories } = this.state;
    console.log(categories);
    return (
      <>
        {categories.map((obj, index) => (
          <span key={ index } data-testid="product">
            <p>{obj.title}</p>
            <img src={ obj.thumbnail } alt={ obj.title } />
            <p>{`${obj.price}${obj.currency}`}</p>
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
