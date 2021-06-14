let shoppingCart = [];

const getShoppingCart = async () => {
  if (localStorage.getItem('ShoppingCart') == null) {
    const data_serialized = JSON.stringify([]);
    localStorage.setItem('ShoppingCart', data_serialized);
  }
  shoppingCart = JSON.parse(localStorage.getItem('ShoppingCart'));
  return shoppingCart;
};

const addShoppingCartProduct = async (product) => {
  if (!shoppingCart.length) {
    await getShoppingCart();
  }
  const find = shoppingCart.findIndex((item) => item.product.id === product.id);
  if (find !== -1) {
    changeQuantity({ operation: '+', index: find });
  } else {
    const toSave = {
      quantity: 1,
      product: product,
    };
    shoppingCart = [...shoppingCart, toSave];
    shoppingCart = JSON.stringify(shoppingCart);
    localStorage.setItem('ShoppingCart', shoppingCart);
    alert('Product added to the Shopping Cart');
  }
};

const changeQuantity = async ({ operation, product, index = '' }) => {
  if (index === '') {
    if (!shoppingCart.length) {
      await getShoppingCart();
    }
    index = shoppingCart.findIndex((item) => item.product.id === product.id);
  }

  switch (operation) {
    case '+':
      shoppingCart[index].quantity += 1;
      break;
    case '-':
      if (shoppingCart[index].quantity > 0) shoppingCart[index].quantity -= 1;
      break;
    default:
      break;
  }
  shoppingCart = JSON.stringify(shoppingCart);
  localStorage.setItem('ShoppingCart', shoppingCart);
};

const removeShoppingCartProduct = async (product) => {
  if (!shoppingCart.length) {
    await getShoppingCart();
  }

  const find = shoppingCart.findIndex((item) => item.product.id === product.id);
  if (find !== -1) {
    shoppingCart.splice(find, 1);
    shoppingCart.length <= 0
      ? (shoppingCart = JSON.stringify([]))
      : (shoppingCart = JSON.stringify(shoppingCart));

    localStorage.setItem('ShoppingCart', shoppingCart);
  }
};

export const LocalStorageFunctions = {
  getShoppingCart: getShoppingCart,
  addShoppingCartProduct: addShoppingCartProduct,
  removeShoppingCartProduct: removeShoppingCartProduct,
  changeQuantity: changeQuantity,
};
