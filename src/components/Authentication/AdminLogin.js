import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function AdminLogin(mobile, password) {
  const formData = new FormData();
  formData.append("mobile", mobile);
  formData.append("password", password);
  const response = await postData(baseUrl + "login.php", formData);
  if (response.status) {
    if (response.data[0].role === "admin") {
      return response.data[0];
    }
  }
  return response.message;
}

export default AdminLogin;
