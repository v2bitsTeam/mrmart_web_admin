import NavBar from "../../components/NavBar/NavBar";
import { Redirect } from "react-router";
import { useAdmin } from "../../contexts/AdminContext";
import { ProductsProvider } from "../../contexts/ProductsContext";
import Products from "../../components/Products/Products";

const ProductsPage = (props) => {
  const admin = useAdmin();
  const categoryId = props.match.params.id.split(":")[1];
  if (!admin.admin) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <ProductsProvider>
        <NavBar active="categories" />
        <Products categoryId={categoryId} />
      </ProductsProvider>
    </div>
  );
};

export default ProductsPage;
