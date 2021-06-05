import React, { Component, Fragment } from 'react';
import { ApiFunctions } from '../utils/apifunctions';
import './css/products.css';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { useHistory } from 'react-router-dom';
import SidebarCategories from '../components/SidebarCategories/SidebarCategories';

export default class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: this.props.match.params.category,
      products: [],
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts = async () => {
    const { category } = this.state;
    const results = await ApiFunctions.GetProductByCategory(category);
    const _category = await ApiFunctions.GetCategoryById(category);
    this.setState({ products: results, category: _category });
  };

  render() {
    const { products, category } = this.state;
    return (
      <Fragment>
        <SidebarCategories category={category} />
        <div className='products_container'>
          <Breadcrumbs category={category} />
          <div className='product_grid'>
            {products.map((product, index) => {
              return (
                <Product product={product} category={category.id} key={index} />
              );
            })}
          </div>
        </div>
      </Fragment>
    );
  }
}

const Product = ({ product, category }) => {
  const history = useHistory();

  const routeChange = () => {
    let path = `/product/${category}/${product.id}`;
    history.push(path);
  };

  return (
    <div className='product_cardd' onClick={routeChange}>
      <div className='product_thumbnail_container'>
        <img src={product.thumbnail} alt={`Thumbnail for ${product.title}`} />
      </div>
      <div className='product_body'>
        <div className='product_price'>
          <div className='price'>
            <span className='sp_price'>${product.price}</span>
          </div>
          <div className='installments'>
            {product.installments ? (
              <span className='sp_payments'>{`${product.installments.quantity} cuotas de $${product.installments.amount}`}</span>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className='product_title'>
          <span className='sp_title'>{product.title}</span>
        </div>
      </div>
    </div>
  );
};
