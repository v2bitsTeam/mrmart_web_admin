import { getData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function getUsers() {
  const response = await getData(baseUrl + "get_all_users.php");
  if (response.status) {
    return response.data;
  }
  return null;
}

export default getUsers;
