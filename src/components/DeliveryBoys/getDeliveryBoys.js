import { getData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function getDeliveryBoys() {
  const response = await getData(baseUrl + "get_all_deliveryBoys.php");
  if (response.status) {
    return response.data;
  }
  return null;
}

export default getDeliveryBoys;
