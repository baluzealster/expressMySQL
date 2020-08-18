//const bala = [];
const data = {
  email: "balu@gmail.com",
  password: "password1",
};
// if (bala) {
//   console.log("hello");
// }
//let k = "";
// const formattedQuery = Object.entries(objectData);
// for (const [key, value] of formattedQuery) {
//   k = k + `${key}="${value}" `;
// }
// let query = "";
// Object.keys(objectData).forEach((key, value) => {
//   query += "update "
// });
let query = "UPDATE users SET ";
let passArray = [];
Object.keys(data).forEach((key, index, array) => {
  console.log(data[key]);
  if (array[array.length - 1] === "email") {
    if (index === array.length - 2) {
      console.log(index);
      query += `${key}=?`;
      passArray.push(data[key]);
    } else if (key !== "email") {
      query += `${key}=?,`;
      passArray.push(data[key]);
    }
  } else if (key != "email") {
    if (index === array.length - 1) {
      query += `${key}=?`;
      passArray.push(data[key]);
    } else {
      query += `${key}=?,`;
      passArray.push(data[key]);
    }
  }
});
passArray.push(data.email);
query = query + ` WHERE email=?`;
console.log("query: ", query, "pasarray: ", passArray);
