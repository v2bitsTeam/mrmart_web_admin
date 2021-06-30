import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function deleteProduct(productId) {
  const formData = new FormData();
  formData.append("pid", productId);
  const response = await postData(baseUrl + "delete_product.php", formData);
  return response;
}

export default deleteProduct;
