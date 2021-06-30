import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function acceptOrder(orderId) {
  const formData = new FormData();
  formData.append("oid", orderId);
  const response = await postData(baseUrl + "accept_order.php", formData);
  return response;
}

export default acceptOrder;
