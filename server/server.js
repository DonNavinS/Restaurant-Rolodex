const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "LaptopWaterParis1027$",
  database: "rest-rolo",
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  db.query("SELECT * FROM total", (err, result) => {
    res.send(result);
    console.log(result);
    console.log("DATA RETRIEVED");
  });
});

app.post("/add", (req, res) => {
  db.query(
    "INSERT INTO total (name, description) VALUES ('popeyes', 'fried chicken');",
    (err, result) => {
      console.log("TOTAL TABLE UPDATED");
    }
  );
});

app.listen(3001, () => {
  console.log("SERVER RUNNING");
});
