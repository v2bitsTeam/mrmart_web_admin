import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function deletePincode(id) {
  const formData = new FormData();
  formData.append("id", id);
  const response = await postData(baseUrl + "delete_pincode.php", formData);
  return response;
}

export default deletePincode;
