import { getData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function getTransactions() {
  const response = await getData(baseUrl + "get_transactions.php");
  if (response.status) {
    return response.data;
  }
  return null;
}

export default getTransactions;
