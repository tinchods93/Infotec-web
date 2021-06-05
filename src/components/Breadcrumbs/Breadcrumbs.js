const Breadcrumbs = ({ category }) => {
  return (
    <nav aria-label='breadcrumb'>
      <ol className='breadcrumb'>
        {category.path_from_root !== undefined ? (
          category.path_from_root.map((path, index) => {
            return (
              <li className='breadcrumb-item' key={index}>
                <a href={`/products/${path.id}`}>{path.name}</a>
              </li>
            );
          })
        ) : (
          <></>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
