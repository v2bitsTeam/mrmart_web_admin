import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function editProduct(formData) {
  const response = await postData(baseUrl + "update_product.php", formData);
  return response;
}

export default editProduct;
