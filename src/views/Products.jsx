import React, { Component, Fragment } from 'react';
import { ApiFunctions } from '../utils/apifunctions';
import './css/products.css';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { formatSearch, formatPrice } from '../utils/stringFormatting';
import { useHistory } from 'react-router-dom';
import SidebarCategories from '../components/SidebarCategories/SidebarCategories';

export default class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category:
        this.props.match !== undefined ? this.props.match.params.category : '',
      context: this.props.context || '',
      products: [],
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts = async () => {
    switch (this.state.context) {
      case 'search':
        const url = this.props.location.search.split('=')[1];
        const _search = formatSearch(url);
        // console.log(_search);
        const searchResult = await ApiFunctions.SearchProducts(_search);
        await this.setState({ products: searchResult.results });
        break;

      default:
        const { category } = this.state;
        const results = await ApiFunctions.GetProductByCategory(category);
        const _category = await ApiFunctions.GetCategoryById(category);
        this.setState({ products: results.results, category: _category });
        break;
    }
  };

  render() {
    const { products, category } = this.state;

    return (
      <div className='main__container--not_home'>
        {this.props.context !== 'search' ? (
          <>
            <Breadcrumbs category={category} />
          </>
        ) : (
          <></>
        )}
        <div className='grid__product__container'>
          <SidebarCategories category={category} />
          {products.map((product, index) => {
            return (
              <Product
                product={product}
                category={
                  category !== undefined ? category.id : product.category_id
                }
                key={index}
              />
            );
          })}
        </div>
      </div>
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
    <div
      className='mycard mycard--roundborder mycard--anim'
      onClick={routeChange}>
      <div className='product__img'>
        <img src={product.thumbnail} alt={`Thumbnail for ${product.title}`} />
      </div>
      <div className='product__body'>
        <div className='product__prices'>
          <div className='price'>
            {formatPrice(product.price, product.currency_id)}
          </div>
          <div className='installments'>
            {product.installments ? (
              `${product.installments.quantity} cuotas de $${product.installments.amount}`
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className='product__title'>{product.title}</div>
      </div>
    </div>
  );
};
