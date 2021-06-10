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
      <div className='itemList'>
        {this.state.shoppingList.length > 0 ? (
          this.state.shoppingList.map((element, key) => {
            return (
              <CartItem
                element={element}
                key={key}
                removeItem={this.removeItem}
                changeQuantity={this.changeQuantity}
              />
            );
          })
        ) : (
          <article className='cartItem'>
            <div className='itemData'>
              <div className='emptyItem'>
                <span className='title'>Your Shopping Cart is empty.</span>
                <br />
                <span className='otherItems'>
                  Go ahead and get your favorite items!
                </span>
              </div>
            </div>
          </article>
        )}
      </div>
    );
  }
}

const CartItem = ({ element, removeItem, changeQuantity }) => {
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
      <article className='cartItem'>
        <div className='itemData'>
          <div className='itemImage'>
            <a href={`/product/${product.category_id}/${product.id}`}>
              <img src={product.pictures[0].url} alt='itemImage' />
            </a>
          </div>
          <div className='itemTitle'>
            <a
              href={`/product/${product.category_id}/${product.id}`}
              className='linkTitle'>
              <span>{product.title}</span>
            </a>
          </div>
          <div className='itemQuantity'>
            <div className='quantityButton'>
              <i
                className='fas fa-minus'
                onClick={() => {
                  changeQuantity({ operation: '-', product: product });
                }}></i>
              <>
                <input
                  type='text'
                  className='quantityInput'
                  value={quantity}
                  onChange={() => {}}
                />
              </>
              <i
                className='fas fa-plus'
                onClick={() => {
                  changeQuantity({ operation: '+', product: product });
                }}></i>
            </div>
          </div>
          <div className='itemPrice'>
            {product.original_price !== null ? (
              <>
                <p>
                  <span id='discount' style={{ marginRight: '3%' }}>
                    -{discount}%
                  </span>
                  <span id='original_price' style={{ fontSize: '1.1rem' }}>
                    ${originalPrice}
                  </span>
                </p>
                <span id='sell_price'>${finalPrice}</span>
              </>
            ) : (
              <span id='sell_price'>${finalPrice}</span>
            )}
          </div>
        </div>
        <div className='itemActions'>
          <p>
            <span
              onClick={() => {
                removeItem(product);
              }}>
              Remove Item
            </span>
          </p>
        </div>
      </article>
      <hr />
    </>
  );
};
