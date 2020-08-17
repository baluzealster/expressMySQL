const sql = require("./models/db");
sql.query(``);

const objectData = {
  name: "balu",
  password: "password",
  gopi: "gopi",
};
//let k = "";
// const formattedQuery = Object.entries(objectData);
// for (const [key, value] of formattedQuery) {
//   k = k + `${key}="${value}" `;
// }
let c = [];
Object.keys(objectData).forEach((key, value) => {
  console.log(objectData[key]);
});

console.log(c);
