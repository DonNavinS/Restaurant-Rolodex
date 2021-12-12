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

app.get("/", (req, res) => {
  res.send("WORKING");
});

app.post("/add", (req, res) => {
  db.query(
    "INSERT INTO total (name, description) VALUES ('popeyes', 'fried chicken');",
    (err, result) => {
      res.send("WORKING");
    }
  );
});

app.listen(3001, () => {
  console.log("SERVER RUNNING");
});
