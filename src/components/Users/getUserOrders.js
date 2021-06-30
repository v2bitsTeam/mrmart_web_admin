import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function getUserOrders(userId) {
  const formData = new FormData();
  formData.append("uid", userId);
  const response = await postData(baseUrl + "get_orders_uid.php", formData);
  if (response.status) {
    return response.data;
  }
  return null;
}

export default getUserOrders;
