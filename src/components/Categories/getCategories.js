import { getData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function getCategories() {
  const response = await getData(baseUrl + "get_all_categories.php");
  if (response.status) {
    return response.data;
  }
  return null;
}

export default getCategories;
