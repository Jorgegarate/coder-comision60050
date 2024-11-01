import { Link } from "react-router-dom";

function Breadcrumbs({ productName, categoryName, categoryId, productId }) {
  const breadcrumbs = [
    { label: "Inicio", path: "/" },
    { label: categoryName || "Category", path: categoryId ? `/category/${categoryId}` : "/category" },
    { label: productName || "Detail", path: productId ? `/detail/${productId}` : "#" },
  ];

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="d-flex">
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className={index === 2 ? "breadcrumb-product" : ""}>
            {index < breadcrumbs.length - 1 ? (
              <Link to={crumb.path} aria-current={index === breadcrumbs.length - 1 ? "page" : undefined}>
                {crumb.label}
              </Link>
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

