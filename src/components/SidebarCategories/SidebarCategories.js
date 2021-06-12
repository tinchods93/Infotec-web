import './sidebar.css';

const SidebarCategories = ({ category }) => {
  return (
    <>
      <section className='sidebar'>
        <dl>
          <dt className='sidebar__dt'>
            <a className='sidebar__link' href={`/products/${category.id}`}>
              {category.name}
            </a>
          </dt>
          {category.children_categories !== undefined ? (
            category.children_categories.map((child, index) => {
              return (
                <dd className='sidebar__dd' key={index}>
                  <a
                    className='sidebar__link__child'
                    href={`/products/${child.id}`}>
                    {child.name}
                  </a>
                </dd>
              );
            })
          ) : (
            <></>
          )}
        </dl>
      </section>
    </>
  );
};

export default SidebarCategories;
