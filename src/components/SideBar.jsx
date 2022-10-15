import React from 'react';
import { NavLink } from 'react-router-dom';
import logoPath from '../imgs/logo.png';
import imgPath from '../imgs/Vector.png';
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
      <>
        <header>
          <div />
          <NavLink to="/">
            <img alt="logo loja" src={ logoPath } />
          </NavLink>
          <NavLink
            to="/shoppingcart"
            data-testid="shopping-cart-button"
          >
            <span>Carrinho de Compras</span>
            <img alt="shoppingCartIcon" src={ imgPath } />
          </NavLink>
        </header>
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
        </aside>
      </>
    );
  }
}

export default SideBar;
