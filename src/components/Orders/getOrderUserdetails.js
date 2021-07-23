import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function getOrderUserdetails(userId) {
  const formData = new FormData();
  formData.append("uid", userId);
  const response = await postData(baseUrl + "get_profile_uid.php", formData);
  return response;
}

export default getOrderUserdetails;
