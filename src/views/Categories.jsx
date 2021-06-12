import React, { Component, Fragment } from 'react';
import { ApiFunctions } from '../utils/apifunctions';
import './css/categories.css';

export default class Categories extends Component {
  constructor(props) {
    super(props);
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
        this.setSections(id);
      });
    });
  };

  setSections = async (category_id) => {
    const category = await ApiFunctions.GetCategoryById(category_id);
    this.setState({ categories: [...this.state.categories, category] });
  };

  render() {
    return (
      <>
        <div className='page__title'>
          <span>Categorías y Secciones</span>
        </div>
        <div className='category__container'>
          {this.state.categories.map((category, index) => {
            return (
              <Fragment key={index}>
                <div className='category__section'>
                  <div className='category__section__title'>
                    <a href={`/products/${category.id}`}>
                      <span>{category.name}</span>
                    </a>
                  </div>
                  <div className='category__section__body'>
                    {category.children_categories.map(({ id, name }, index) => {
                      return (
                        <div className='category__section__link'>
                          <a href={`/products/${id}`} key={index}>
                            {name}
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <hr />
              </Fragment>
            );
          })}
        </div>
      </>
    );
  }
}
