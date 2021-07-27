import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function addPincode(pincode, address) {
  const formData = new FormData();
  formData.append("pincode", pincode.trim());
  formData.append("address", address.trim());
  const response = await postData(baseUrl + "add_pincode.php", formData);
  return response;
}

export default addPincode;
