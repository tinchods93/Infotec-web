import axios from 'axios';
/*
####ids###
////smarthphones=MLA1051////

////computacion=MLA1648////
placas de video = MLA1658
procesadores =  MLA1693
memory_rams = MLA1694
motherboards = MLA1692
/////
 */
let categories = [];

const GetCategories = async () => {
  if (categories.length > 0) {
    return categories;
  } else {
    categories = await axios
      .get(`https://api.mercadolibre.com/sites/MLA/categories`)
      .then((resp) => resp.data)
      .catch((err) => console.log(err));
    return categories;
  }
};

const GetCategoryById = async (category_id) => {
  const category = await axios
    .get(`https://api.mercadolibre.com/categories/${category_id}`)
    .then((resp) => resp.data)
    .catch((err) => console.log(err));
  return category;
};

const GetProductByCategory = async (category_id) => {
  const products = await axios
    .get(
      `https://api.mercadolibre.com/sites/MLA/search?category=${category_id}`
    )
    .then((resp) => resp.data.results)
    .catch((err) => console.log(err));
  return products;
};

const GetProductById = async (product_id) => {
  const product = await axios
    .get(`https://api.mercadolibre.com/items?ids=${product_id}`)
    .then((resp) => resp.data)
    .catch((err) => console.log(err));
  return product[0].body;
};

const SearchProducts = async (search) => {
  const products = await axios
    .get(`https://api.mercadolibre.com/sites/MLA/search?q=${search}`)
    .then((resp) => resp.data)
    .catch((err) => console.log(err));
  return products;
  // return product[0].body;
};

export const ApiFunctions = {
  GetProductByCategory: GetProductByCategory,
  GetProductById: GetProductById,
  GetCategoryById: GetCategoryById,
  GetCategories: GetCategories,
  SearchProducts: SearchProducts,
};
