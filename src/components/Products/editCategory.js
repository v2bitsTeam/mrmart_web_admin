import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function editCategory(formData) {
  const response = await postData(baseUrl + "update_category.php", formData);
  return response;
}

export default editCategory;
