import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function getDeliveryBoy(uid) {
  const formData = new FormData();
  formData.append("uid", uid);
  const response = await postData(
    baseUrl + "get_deliveryboy_uid.php",
    formData
  );
  if (response.status) {
    return response.data;
  }
  return null;
}

export default getDeliveryBoy;
