const objectData = {
  name: "balu",
  password: "password",
  gopi: "gopi",
};
let k = "";
const formattedQuery = Object.entries(objectData);
for (const [key, value] of formattedQuery) {
  k = k + `${key}="${value}" `;
}

console.log(k);
