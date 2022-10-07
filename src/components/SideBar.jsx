import React from 'react';
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
            <button type="button" data-testid="category">{item.name}</button>
          </div>
        ))}
      </aside>
    );
  }
}

export default SideBar;
