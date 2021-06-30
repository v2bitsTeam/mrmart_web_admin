import NavBar from "../../components/NavBar/NavBar";
import { Redirect } from "react-router";
import { useAdmin } from "../../contexts/AdminContext";
import { OrdersProvider } from "../../contexts/OrdersContext";
import { DeliveryBoysProvider } from "../../contexts/DeliveryBoysContext";
import Orders from "../../components/Orders/Orders";

const OrdersPage = () => {
  const admin = useAdmin();
  if (!admin.admin) {
    return <Redirect to="/" />;
  }

  return (
    <OrdersProvider>
      <DeliveryBoysProvider>
        <NavBar active="orders" />
        <Orders />
      </DeliveryBoysProvider>
    </OrdersProvider>
  );
};

export default OrdersPage;
