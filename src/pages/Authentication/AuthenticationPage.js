import Authentication from "../../components/Authentication/Authentication";
import { useAdmin } from "../../contexts/AdminContext";
import { Redirect } from "react-router";

const AuthenticationPage = () => {
  const admin = useAdmin();

  if (admin.admin) return <Redirect to="/users" />;

  return <Authentication />;
};

export default AuthenticationPage;
