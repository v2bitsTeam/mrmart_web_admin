import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function deleteDeliveryBoy(deliveryBoyId) {
  const formData = new FormData();
  formData.append("uid", deliveryBoyId);
  const response = await postData(baseUrl + "delete_deliveryboy.php", formData);
  return response;
}

export default deleteDeliveryBoy;
