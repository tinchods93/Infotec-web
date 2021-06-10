/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component, React } from 'react';
import './Navbar.css';
import logo from '../../images/logo-principal.png';
import { ApiFunctions } from '../../utils/apifunctions';

const NavbarCategory = ({ id, name, children_categories }) => {
  return (
    <div className='col'>
      <div className='category row'>
        <a href={`/products/${id}`} className='main-category dropdown-link'>
          {name}
        </a>
      </div>
    </div>
  );
};

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.getCategories();
  }

  getCategories = () => {
    let { categories } = this.state;
    if (categories.length <= 0) {
      ApiFunctions.GetCategories().then((resp) => {
        this.setState({ categories: resp });
      });
    }
  };

  render() {
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container-fluid'>
          <div className='logo-container'>
            <a href='/'>
              <img src={logo} alt='Infotec Logo' />
            </a>
          </div>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <a className='nav-link active' aria-current='page' href='/'>
                  Home
                </a>
              </li>
              <li className='nav-item dropdown-hover'>
                <a className='nav-link dropdown-btn' href='/categories'>
                  Categories
                </a>
                <div className='container dropdown-content'>
                  <div className='row'>
                    {this.state.categories.map(({ name, id }, index) => {
                      return <NavbarCategory name={name} id={id} key={index} />;
                    })}
                  </div>
                </div>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='../about.html'>
                  About us
                </a>
              </li>
            </ul>

            <form
              action='/products/search?:searchProd'
              method='GET'
              className='d-flex'>
              <input
                className='form-control me-2'
                // type='search'
                placeholder='Search'
                name='searchProd'
                aria-label='Search'
                onChange={this.props.onchange}
                onKeyDown={this.props.handleKeyEvents}
              />
            </form>
            <a href='/shoppingCart' className='navbar nav-link'>
              <i className='fas fa-shopping-cart'></i>
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
