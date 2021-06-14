import React, { Component, Fragment } from 'react';
import './css/productPage.css';
import { ApiFunctions } from '../utils/apifunctions';
import { formatPrice } from '../utils/stringFormatting';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';

export default class ProductView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.match.params.category,
      productId: this.props.match.params.productId,
      addCartItem: this.props.addCartItem,
      product: {},
      currentImage: '',
    };
  }

  componentDidMount() {
    this.getProduct();
  }

  getProduct = async () => {
    const { productId, category } = this.state;
    const product = await ApiFunctions.GetProductById(productId);
    const _category = await ApiFunctions.GetCategoryById(category);

    this.setState({
      product: product,
      currentImage: product.pictures[0].url,
      category: _category,
    });
  };

  thumbnailOnMouseHover = (ev) => {
    this.setState({ currentImage: ev.target.src });
  };

  addCartProduct = () => {
    const { product, addCartItem } = this.state;
    addCartItem(product);
  };

  render() {
    const { product, currentImage, category } = this.state;
    return product.pictures !== undefined ? (
      <div className='main__container--not_home'>
        <Breadcrumbs category={category} />
        <div className='product__card '>
          <div className='product__card__caracteristics'>
            <div className='product__img__container'>
              <div className='product__mainImg'>
                <img src={currentImage} alt='' />
              </div>
              <div className='product__thumbnails'>
                {product.pictures.map(({ url }, index) => {
                  return (
                    <img
                      src={url}
                      alt='thumbnail'
                      key={index}
                      onMouseOver={this.thumbnailOnMouseHover}
                    />
                  );
                })}
              </div>
            </div>
            <div className='product__card__info'>
              <div className='product__card__info__body'>
                <div className='product__card__sold'>
                  <p>
                    <span id='product_condition'>
                      {product.condition === 'used' ? 'Usado' : 'Nuevo'}
                    </span>
                    {product.sold_quantity > 0 ? (
                      <>
                        <span> | </span>
                        <span id='sold_quantity'>
                          {product.sold_quantity} vendidos
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                  </p>
                </div>
                <div className='product__card__title'>
                  <h5>{product.title}</h5>
                </div>
                <div className='product__card__price'>
                  <div className='product__price'>
                    {product.original_price !== null ? (
                      <>
                        <span id='original__price'>
                          {formatPrice(
                            product.original_price,
                            product.currency_id
                          )}
                        </span>
                        <p>
                          <span id='sell__price'>
                            {formatPrice(
                              product.base_price,
                              product.currency_id
                            )}
                          </span>
                          <span id='discount'>
                            {Math.floor(
                              100 -
                                (product.price / product.original_price) * 100
                            )}
                            % OFF
                          </span>
                        </p>
                      </>
                    ) : (
                      <span id='sell__price'>
                        {formatPrice(product.base_price, product.currency_id)}
                      </span>
                    )}
                  </div>
                  <div className='product__payments'>
                    <p>
                      <span>en </span>
                      <span id='cuotas'>
                        3x {(product.base_price / 3).toFixed(2)} sin interés
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className='product__card__info__actions'>
                <button
                  className='mybtn btn btn-secondary'
                  onClick={this.addCartProduct}>
                  Agregar al carrito
                </button>
                <button className='mybtn btn btn-primary'>Comprar ahora</button>
              </div>
            </div>
          </div>
          <div className='product__description '>
            <div className='product__description__title'>
              <span>Descripción</span>
            </div>
            <div className='product__description__body'>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias,
                illum veniam ea reprehenderit ratione corrupti deserunt iusto,
                dolor error voluptatibus possimus veritatis assumenda neque
                laudantium aut ipsa debitis, totam earum saepe quasi voluptatum
                distinctio optio facere? Velit cumque pariatur sequi eligendi
                dolorum dolor, mollitia ullam natus, vero quam quis ipsa
                molestias eaque, ab inventore reprehenderit accusantium earum
                tempora autem corrupti?
                <br /> Ut animi temporibus, quas impedit vitae culpa
                exercitationem magni quaerat odio commodi, veritatis numquam
                aspernatur saepe repellendus at officia obcaecati sed quisquam
                accusantium cumque magnam. Voluptatibus autem eum totam, eveniet
                magni cupiditate, ullam cumque in quasi dignissimos minus! Amet,
                id.
              </p>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <></>
    );
  }
}
