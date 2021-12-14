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

// ROUTES FOR TOTAL TABLE

app.get("/total", (req, res) => {
  db.query("SELECT * FROM total", (err, result) => {
    res.send(result);
    console.log(result);
    console.log("DATA RETRIEVED");
  });
});

app.post("/add", (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  db.query(
    "INSERT INTO total (name, description) VALUES (?,?);",
    [name, description],
    (err, result) => {
      console.log("TOTAL TABLE UPDATED");
      console.log(err);
    }
  );
});

app.delete("/total/remove/:name", (req, res) => {
  const name = req.params.name;
  db.query(`DELETE FROM total WHERE name = '${name}'`, (err, result) => {
    console.log("ITEM DELETED");
    console.log(err);
    console.log(result);
  });
});

app.put("/update/name/:name", (req, res) => {
  const oldName = req.params.name;
  const newName = req.body.newName;
  db.query(`UPDATE total SET name='${newName}' WHERE name ='${oldName}'`);
});

app.put("/update/description/:description", (req, res) => {
  const oldDesc = req.params.description;
  const newDesc = req.body.newDesc;
  db.query(
    `UPDATE total SET description='${newDesc}' WHERE description ='${oldDesc}'`
  );
});

// ROUTES FOR TRIED TABLE
app.get("/tried", (req, res) => {
  db.query("SELECT * FROM tried", (err, result) => {
    res.send(result);
  });
});

app.post("/tried/add", (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  db.query(
    "INSERT INTO tried (name, description) VALUES (?,?);",
    [name, description],
    (err, result) => {
      console.log("TRIED TABLE UPDATED");
      console.log(err);
    }
  );
});

app.delete("/tried/remove/:name", (req, res) => {
  const name = req.params.name;
  db.query(`DELETE FROM tried WHERE name = '${name}'`);
});

app.put("/tried/update/name/:name", (req, res) => {
  const oldName = req.params.name;
  const newName = req.body.newName;
  db.query(`UPDATE tried SET name='${newName}' WHERE name ='${oldName}'`);
});

app.put("/tried/update/description/:description", (req, res) => {
  const oldDesc = req.params.description;
  const newDesc = req.body.newDesc;
  db.query(
    `UPDATE tried SET description='${newDesc}' WHERE description ='${oldDesc}'`
  );
});
app.listen(3001, () => {
  console.log("SERVER RUNNING");
});
