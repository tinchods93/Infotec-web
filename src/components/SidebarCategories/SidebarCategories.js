import { useState } from 'react';
import './sidebar.css';

const SidebarCategories = ({ category }) => {
  // console.log(category);
  const [active, setActive] = useState(false);

  const toggleSideBar = () => {
    setActive(!active);
  };

  return (
    <>
      <i
        className='fas fa-caret-square-down'
        onMouseOver={toggleSideBar}
        onClick={toggleSideBar}></i>
      {active ? (
        <section className='sidebar'>
          <dl>
            <dt className='sidebar_child'>
              <a href={`/products/${category.id}`}>{category.name}</a>
            </dt>
            {category.children_categories !== undefined ? (
              category.children_categories.map((child, index) => {
                return (
                  <dd className='sidebar_child' key={index}>
                    <a href={`/products/${child.id}`}>{child.name}</a>
                  </dd>
                );
              })
            ) : (
              <></>
            )}
          </dl>
        </section>
      ) : (
        <></>
      )}
    </>
  );
};

export default SidebarCategories;
