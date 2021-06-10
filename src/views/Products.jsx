import React, { Component, Fragment } from 'react';
import { ApiFunctions } from '../utils/apifunctions';
import './css/products.css';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { formatSearch } from '../utils/stringFormatting';
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
        console.log(searchResult);
        await this.setState({ products: searchResult.results });
        break;

      default:
        const { category } = this.state;
        const results = await ApiFunctions.GetProductByCategory(category);
        const _category = await ApiFunctions.GetCategoryById(category);
        console.log(results);
        this.setState({ products: results.results, category: _category });
        break;
    }
  };

  render() {
    const { products, category } = this.state;
    return (
      <Fragment>
        <div className='products_container'>
          {this.props.context !== 'search' ? (
            <>
              <SidebarCategories category={category} />
              <Breadcrumbs category={category} />
            </>
          ) : (
            <></>
          )}
          <div className='product_grid'>
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
