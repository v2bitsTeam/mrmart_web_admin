import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function fetchOrderItems(orderId) {
  const formData = new FormData();
  formData.append("oid", orderId);
  const response = await postData(baseUrl + "get_cart_order_id.php", formData);
  if (response.status) {
    return response.data;
  }
  return null;
}
export default fetchOrderItems;
