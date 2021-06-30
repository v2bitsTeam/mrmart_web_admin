import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function deleteCategory(categoryId) {
  const formData = new FormData();
  formData.append("cid", categoryId);
  const response = await postData(baseUrl + "delete_category.php", formData);
  return response;
}

export default deleteCategory;
