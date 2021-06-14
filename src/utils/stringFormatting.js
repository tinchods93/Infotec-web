export const formatSearch = (word) => {
  word = word.split('+');
  word = word.join('%20');
  return word;
};

export const formatPrice = (price, currency = '') => {
  price = price.toString();
  let formatt = '';

  if (currency === 'USD') {
    formatt = Intl.NumberFormat('en-US');
    price = formatt.format(price);
    price = `${price}u$d`;
  } else {
    formatt = Intl.NumberFormat('es-AR');
    price = formatt.format(price);
    price = `$${price}`;
  }
  return price;
};
