import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function declineOrder(orderId) {
  const formData = new FormData();
  formData.append("oid", orderId);
  const response = await postData(baseUrl + "decline_order.php", formData);
  return response;
}

export default declineOrder;
