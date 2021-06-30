import NavBar from "../../components/NavBar/NavBar";
import { Redirect } from "react-router";
import { useAdmin } from "../../contexts/AdminContext";
import { PincodesProvider } from "../../contexts/PincodesContext";
import Pincodes from "../../components/Pincodes/Pincodes";

const PincodesPage = () => {
  const admin = useAdmin();
  if (!admin.admin) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <PincodesProvider>
        <NavBar active="pincodes" />
        <Pincodes />
      </PincodesProvider>
    </div>
  );
};

export default PincodesPage;
