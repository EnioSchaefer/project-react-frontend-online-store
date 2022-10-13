import PropTypes from 'prop-types';
import React from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getProductsFromCategoryAndQuery(id, null);
    this.setState({ products: response.results });
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

  handleClick = (event) => {
    const value = event.target.getAttribute('value');

    const { history } = this.props;
    history.push(`/product/${value}`);
  };

  render() {
    const { products } = this.state;

    return (
      <>
        {products.map((obj, index) => (
          <div
            data-testid="product"
            key={ index }
          >
            <p className={ obj.id }>{obj.title}</p>
            <img value={ obj.id } src={ obj.thumbnail } alt={ obj.title } />
            <p value={ obj.id }>{`${obj.price}`}</p>
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
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};
