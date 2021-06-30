import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function addPincode(pincode, address) {
  const formData = new FormData();
  formData.append("pincode", pincode);
  formData.append("address", address);
  const response = await postData(baseUrl + "add_pincode.php", formData);
  return response;
}

export default addPincode;
