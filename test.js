const bala = [];
const objectData = {
  name: "balu",
  password: "password",
  gopi: "gopi",
};
if (bala) {
  console.log("hello");
}
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
