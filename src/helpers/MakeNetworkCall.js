export async function postData(url = "", data = "") {
  const response = await fetch(url, {
    method: "POST",
    body: data,
  });
  return response.json();
}
export async function getData(url = "") {
  const response = await fetch(url);
  return response.json();
}
