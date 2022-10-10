import React from 'react';
import { NavLink } from 'react-router-dom';
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
      </aside>
    );
  }
}

export default SideBar;
