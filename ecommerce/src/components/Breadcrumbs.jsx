import { Link } from "react-router-dom";

function Breadcrumbs({ productName, categoryName, productId }) {
  const breadcrumbs = [
    { id: 1, label: "Inicio", path: "/" },
    { id: 2, label: categoryName || "Categoría", path: "/categoria" }, // Ajusta el path según tu enrutamiento
    { id: 3, label: productName || "Producto", path: productId ? `/producto/${productId}` : "#" }, // Añadido ID del producto
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


