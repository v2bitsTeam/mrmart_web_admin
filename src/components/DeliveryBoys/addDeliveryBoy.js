import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function addDeliveryBoy(formData) {
  const response = await postData(baseUrl + "add_deliveryboy.php", formData);
  return response;
}

export default addDeliveryBoy;
