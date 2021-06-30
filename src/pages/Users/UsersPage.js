import NavBar from "../../components/NavBar/NavBar";
import { Redirect } from "react-router";
import { useAdmin } from "../../contexts/AdminContext";
import { UsersProvider } from "../../contexts/UsersContext";
import Users from "../../components/Users/Users";

const UsersPage = () => {
  const admin = useAdmin();
  if (!admin.admin) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <UsersProvider>
        <NavBar active="users" />
        <Users />
      </UsersProvider>
    </div>
  );
};

export default UsersPage;
