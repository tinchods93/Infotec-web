import React, { Component } from 'react';
import { LocalStorageFunctions } from '../utils/localStorageFunctions';
import './css/shoppingCart.css';
export default class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingList: [],
    };
    this.removeItem = this.removeItem.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
  }

  componentDidMount() {
    this.updateShoppingList();
  }

  updateShoppingList() {
    LocalStorageFunctions.getShoppingCart().then((resp) => {
      this.setState({ shoppingList: resp });
    });
  }

  removeItem(product) {
    LocalStorageFunctions.removeShoppingCartProduct(product);
    this.updateShoppingList();
  }

  async changeQuantity({ operation, product }) {
    await LocalStorageFunctions.changeQuantity({
      operation: operation,
      product: product,
    });
    this.updateShoppingList();
  }

  render() {
    return (
      <div className='main__container--not_home'>
        <div className='item__list'>
          {this.state.shoppingList.length > 0 ? (
            this.state.shoppingList.map((element, key) => {
              return (
                <CartItem
                  element={element}
                  key={key}
                  removeItem={this.removeItem}
                  changeQuantity={this.changeQuantity}
                  lastChild={
                    !(key < this.state.shoppingList.length - 1) ? true : false
                  }
                />
              );
            })
          ) : (
            <article className='item'>
              <div className='item__data'>
                <div className='empty__item'>
                  <span className='title'>Your Shopping Cart is empty.</span>
                  <br />
                  <span className='other__items'>
                    Go ahead and get your favorite items!
                  </span>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    );
  }
}

const CartItem = ({ element, removeItem, changeQuantity, lastChild }) => {
  let { quantity, product } = element;

  let originalPrice;
  let finalPrice;
  let discount;
  if (product.original_price !== null) {
    discount = Math.floor(100 - (product.price / product.original_price) * 100);
    originalPrice = product.original_price * quantity;
    finalPrice = (originalPrice - (originalPrice * discount) / 100).toFixed(0);
  } else {
    finalPrice = product.base_price * quantity;
  }
  return (
    <>
      <article className='item'>
        <div className='item__data'>
          <div className='item__data__image'>
            <a href={`/product/${product.category_id}/${product.id}`}>
              <img src={product.pictures[0].url} alt='item__data__image' />
            </a>
          </div>
          <div className='item__data__title'>
            <a
              href={`/product/${product.category_id}/${product.id}`}
              className='link__title'>
              <span>{product.title}</span>
            </a>
          </div>
          <div className='item__data__quantity'>
            <div className='quantity__button'>
              <div className='quantity__operator'>
                <i
                  className='fas fa-minus'
                  onClick={() => {
                    changeQuantity({ operation: '-', product: product });
                  }}></i>
              </div>
              <div className='quantity__input_container'>
                <input
                  type='text'
                  className='quantity__input'
                  value={quantity}
                  onChange={() => {}}
                />
              </div>
              <div className='quantity__operator'>
                <i
                  className='fas fa-plus'
                  onClick={() => {
                    changeQuantity({ operation: '+', product: product });
                  }}></i>
              </div>
            </div>
          </div>
          <div className='item__data__price'>
            {product.original_price !== null ? (
              <>
                <p>
                  <span id='discount' style={{ marginRight: '3%' }}>
                    -{discount}%
                  </span>
                  <span id='original__price' style={{ fontSize: '1.1rem' }}>
                    ${originalPrice}
                  </span>
                </p>
                <span id='sell__price'>${finalPrice}</span>
              </>
            ) : (
              <span id='sell__price'>${finalPrice}</span>
            )}
          </div>
        </div>
        <div className='item__actions'>
          <p>
            <span
              onClick={() => {
                removeItem(product);
              }}>
              Remove Item
            </span>
          </p>
        </div>
        {!lastChild ? <hr /> : <></>}
      </article>
    </>
  );
};
