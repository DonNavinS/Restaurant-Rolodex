const express = require("express");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "LaptopWaterParis1027$",
  database: "rest-rolo",
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3001, () => {
  console.log("SERVER RUNNING");
});
