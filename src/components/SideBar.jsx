import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getCategories } from '../services/api';

class SideBar extends React.Component {
  constructor() {
    super();
    this.state = {
      categoriesList: [],
    };
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categoriesList: categories });
  }

  render() {
    const { categoriesList } = this.state;
    return (
      <aside>
        { categoriesList.map((item, index) => (
          <div key={ index }>
            <NavLink
              data-testid="category"
              to={ `/categories/${item.id}` }
              value={ item.id }
            >
              {item.name}
            </NavLink>
          </div>
        ))}
        <NavLink
          to="/shoppingcart"
          data-testid="shopping-cart-button"
        >
          Carrinho de Compras
        </NavLink>
      </aside>
    );
  }
}

export default SideBar;
