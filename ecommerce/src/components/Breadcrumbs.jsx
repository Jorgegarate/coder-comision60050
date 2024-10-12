import { Link } from "react-router-dom";

function Breadcrumbs({ productName, categoryName, categoryId, productId }) {
  const breadcrumbs = [
    { id: 1, label: "Inicio", path: "/" },
    { id: 2, label: categoryName || "Category", path: categoryId ? `/category/${categoryId}` : "/category" },
    { id: 3, label: productName || "Detail", path: productId ? `/detail/${productId}` : "#" },
  ];

  return (
    <nav aria-label="breadcrumb">
      <ol className="d-flex">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.id} className="">
            {index < breadcrumbs.length - 1 ? (
              <Link to={crumb.path}>{crumb.label}</Link>
            ) : (
              <span>{crumb.label}</span>
            )}
            {index < breadcrumbs.length - 1 && (
              <span className="breadcrumb-separator"> / </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;


