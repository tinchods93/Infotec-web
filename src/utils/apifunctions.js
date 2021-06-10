import axios from 'axios';
let categories = [];
//I know this shouldnt be in here, but this is for portfolio and easy netfily deployment
const key = '4S85crnYRw5am1sCBHWVALMYuwZf6lrf';

const config = { headers: { Authorization: `Bearer ${key}` } };

const GetCategories = async () => {
  if (categories.length > 0) {
    return categories;
  } else {
    categories = await axios
      .get(`https://api.mercadolibre.com/sites/MLA/categories`, config)
      .then((resp) => resp.data)
      .catch((err) => console.log(err));
    return categories;
  }
};

const GetCategoryById = async (category_id) => {
  const category = await axios
    .get(`https://api.mercadolibre.com/categories/${category_id}`, config)
    .then((resp) => resp.data)
    .catch((err) => console.log(err));
  return category;
};

const GetProductByCategory = async (category_id) => {
  const products = await axios
    .get(
      `https://api.mercadolibre.com/sites/MLA/search?category=${category_id}`,
      config
    )
    .then((resp) => resp.data)
    .catch((err) => console.log(err));
  return products;
};

const GetProductById = async (product_id) => {
  const product = await axios
    .get(`https://api.mercadolibre.com/items?ids=${product_id}`, config)
    .then((resp) => resp.data)
    .catch((err) => console.log(err));
  return product[0].body;
};

const SearchProducts = async (search) => {
  const products = await axios
    .get(`https://api.mercadolibre.com/sites/MLA/search?q=${search}`, config)
    .then((resp) => resp.data)
    .catch((err) => console.log(err));
  return products;
};

export const ApiFunctions = {
  GetProductByCategory: GetProductByCategory,
  GetProductById: GetProductById,
  GetCategoryById: GetCategoryById,
  GetCategories: GetCategories,
  SearchProducts: SearchProducts,
};
