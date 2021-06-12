import React, { Component } from 'react';
import { ApiFunctions } from '../utils/apifunctions';
import img_not_found from '../images/image-not-found.jpg';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    if (!this.state.categories.length) {
      this.setCategories();
    }
  }

  setCategories = async () => {
    await ApiFunctions.GetCategories().then((resp) => {
      resp.forEach(async ({ id }) => {
        await this.getCategoryObj(id);
      });
    });
  };

  getCategoryObj = async (category_id) => {
    const category = await ApiFunctions.GetCategoryById(category_id);
    this.setState({ categories: [...this.state.categories, category] });
  };

  render() {
    const { categories } = this.state;
    return (
      <>
        <div className='grid__product__container'>
          {categories.map((category, index) => {
            return <CategoryCard category={category} key={index} />;
          })}
        </div>
      </>
    );
  }
}

const CategoryCard = ({ category }) => {
  const imgError = (ev) => {
    ev.target.src = img_not_found;
  };
  return (
    <>
      <div className='mycard'>
        <div className='imgContainer'>
          <a href={`/products/${category.id}`}>
            <img src={category.picture} alt='product-img' onError={imgError} />
          </a>
        </div>
        <div className='mycard__title'>
          <a href={`/products/${category.id}`}>
            <span>{category.name}</span>
          </a>
        </div>
      </div>
    </>
  );
};
