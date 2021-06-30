import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function addCategory(formData) {
  const response = await postData(baseUrl + "add_category.php", formData);
  return response;
}

export default addCategory;
