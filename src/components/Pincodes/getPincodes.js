import { getData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function getPincodes() {
  const response = await getData(baseUrl + "get_pincodes.php");
  if (response.status) {
    return response.data;
  }
  return null;
}

export default getPincodes;
