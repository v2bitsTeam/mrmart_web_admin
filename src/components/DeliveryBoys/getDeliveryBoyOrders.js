import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function getDeliveryBoyOrders(deilveryBoyId) {
  const formData = new FormData();
  formData.append("deliveryBoy_id", deilveryBoyId);
  const response = await postData(
    baseUrl + "get_orders_deliveryboy.php",
    formData
  );
  if (response.status) {
    return response.data;
  }
  return null;
}

export default getDeliveryBoyOrders;
