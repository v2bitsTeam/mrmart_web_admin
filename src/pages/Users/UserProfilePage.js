import NavBar from "../../components/NavBar/NavBar";
import { Redirect } from "react-router";
import { useAdmin } from "../../contexts/AdminContext";
import UserProfile from "../../components/Users/UserProfile";
import { UserOrdersProvider } from "../../contexts/UserOrdersContext";

const UserProfilePage = (props) => {
  const admin = useAdmin();
  const userId = props.match.params.id.split(":")[1];

  if (!admin.admin) {
    return <Redirect to="/" />;
  }

  return (
    <UserOrdersProvider>
      <NavBar active="users" />
      <UserProfile userId={userId} />
    </UserOrdersProvider>
  );
};

export default UserProfilePage;
