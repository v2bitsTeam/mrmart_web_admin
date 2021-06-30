import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function addProduct(formData) {
  const response = await postData(baseUrl + "add_product.php", formData);
  return response;
}

export default addProduct;
