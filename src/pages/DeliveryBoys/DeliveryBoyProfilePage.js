import NavBar from "../../components/NavBar/NavBar";
import { Redirect } from "react-router";
import { useAdmin } from "../../contexts/AdminContext";
import DeliveryBoyProfile from "../../components/DeliveryBoys/DeliveryBoyProfile";
import { DeliveryBoyOrdersProvider } from "../../contexts/DeliveryBoyOrdersContext";

const DeliveryBoyProfilePage = (props) => {
  const admin = useAdmin();
  const deliveryBoyId = props.match.params.id.split(":")[1];

  if (!admin.admin) {
    return <Redirect to="/" />;
  }

  return (
    <DeliveryBoyOrdersProvider>
      <NavBar active="deliveryBoys" />
      <DeliveryBoyProfile deliveryBoyId={deliveryBoyId} />
    </DeliveryBoyOrdersProvider>
  );
};

export default DeliveryBoyProfilePage;
