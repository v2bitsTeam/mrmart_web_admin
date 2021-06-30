import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function getProducts(categoryId) {
  const formData = new FormData();
  formData.append("cid", categoryId);
  const response = await postData(
    baseUrl + "get_products_by_categoryId.php",
    formData
  );
  if (response.status) {
    return response.data;
  }
  return null;
}

export default getProducts;
