import NavBar from "../../components/NavBar/NavBar";
import { Redirect } from "react-router";
import { useAdmin } from "../../contexts/AdminContext";
import { CategoriesProvider } from "../../contexts/CategoriesContext";
import Categories from "../../components/Categories/Categories";

const CategoriesPage = ({ location }) => {
  const admin = useAdmin();
  const fromLocation = location?.state?.fromLocation ?? "";

  if (!admin.admin) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <CategoriesProvider>
        <NavBar active="categories" />
        <Categories fromLocation={fromLocation} />
      </CategoriesProvider>
    </div>
  );
};

export default CategoriesPage;
