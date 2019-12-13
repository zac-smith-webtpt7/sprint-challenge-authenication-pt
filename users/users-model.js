const db = require("../database/dbConfig.js");

const add = user => db("users").insert(user);
const find = user => db("users").where(user);

module.exports = {
  add,
  find
};
