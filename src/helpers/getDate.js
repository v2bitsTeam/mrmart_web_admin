function getDate(date) {
  let dateArray = date.split(" ")[0].split("-");
  return dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0];
}

export default getDate;
