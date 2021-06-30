import { getData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function getOrders() {
  const response = await getData(baseUrl + "get_orders_all.php");
  if (response.status) {
    return response.data;
  }
  return null;
}

export default getOrders;
