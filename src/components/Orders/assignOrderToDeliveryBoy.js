import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function assignOrderToDeliveryBoy(orderId, deliveryBoyId) {
  const formData = new FormData();
  formData.append("oid", orderId);
  formData.append("deliveryBoy_id", deliveryBoyId);
  const response = await postData(
    baseUrl + "assign_deliveryboy_to_order.php",
    formData
  );
  return response;
}

export default assignOrderToDeliveryBoy;
