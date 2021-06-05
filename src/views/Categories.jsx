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

  componentDidMount() {
    if (!this.state.categories.length) {
      this.setCategories();
    }
  }

  render() {
    return (
      <>
        <div className='title'>
          <span>Categorías y Secciones</span>
        </div>
        <div className='category_card'>
          {this.state.categories.map((category, index) => {
            return (
              <Fragment key={index}>
                <div className='category_section'>
                  <div className='category_section_title'>
                    <a href={`/products/${category.id}`} className='links'>
                      <h4>{category.name}</h4>
                    </a>
                  </div>
                  <div className='category_section_body'>
                    {category.children_categories.map(({ id, name }, index) => {
                      return (
                        <a
                          href={`/products/${id}`}
                          key={index}
                          className='links'>
                          {name}
                        </a>
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
