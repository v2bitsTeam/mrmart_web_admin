import NavBar from "../../components/NavBar/NavBar";
import { Redirect } from "react-router";
import { useAdmin } from "../../contexts/AdminContext";
import { DeliveryBoysProvider } from "../../contexts/DeliveryBoysContext";
import DeliveryBoys from "../../components/DeliveryBoys/DeliveryBoys";

const DeliveryBoysPage = ({ location }) => {
  const from = location?.state?.from;
  const admin = useAdmin();
  if (!admin.admin) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <DeliveryBoysProvider>
        <NavBar active="deliveryBoys" />
        <DeliveryBoys from={from} />
      </DeliveryBoysProvider>
    </div>
  );
};

export default DeliveryBoysPage;
