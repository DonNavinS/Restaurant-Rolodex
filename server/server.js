const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { createToken, checkToken } = require("./JWT");
const cookieParser = require("cookie-parser");

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
app.use(cookieParser());

// ROUTES FOR SIGNUP AND LOGIN
app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    `INSERT INTO users (username, password) VALUES ('${username}','${password}');`,
    (err, result) => {
      console.log("NEW USER ADDED ");
      res.send("new user added");
    }
  );
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await db
    .promise()
    .query(`SELECT * FROM users WHERE username='${username}'`);

  console.log(user[0][0]);

  if (user[0][0] === undefined || user[0][0].password !== password) {
    res.send("Invalid Credentials");
  } else if (
    user[0][0].username === username &&
    user[0][0].password === password
  ) {
    const accessToken = createToken(user[0][0]);

    // res.cookie("access_token", accessToken, {
    //   maxAge: 1000 * 60 * 60,
    // });
    res.send({ user: user[0][0], token: accessToken });
    console.log(user[0][0]);
  }
});

app.get("/user/login", checkToken, (req, res) => {
  res.send("WORKING");
});

// ROUTES FOR TOTAL TABLE

app.get("/total", (req, res) => {
  db.query("SELECT * FROM total", (err, result) => {
    res.send(result);
    console.log(result);
    console.log("DATA RETRIEVED");
  });
});

app.get("/test", (req, res) => {
  console.log(req.sessions);
});

app.post("/total/add", (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const username = req.body.username;
  db.query(
    `INSERT INTO total (name, description, user_id) VALUES ('${name}', '${description}', (SELECT ID from users WHERE username='${username}'));`,
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

app.put("/total/update/name/:name", (req, res) => {
  const oldName = req.params.name;
  const newName = req.body.newName;
  db.query(`UPDATE total SET name='${newName}' WHERE name ='${oldName}'`);
});

app.put("/total/update/description/:description", (req, res) => {
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
  const username = req.body.username;
  db.query(
    `INSERT INTO tried (name, description, user_id) VALUES ('${name}', '${description}', (SELECT ID from users WHERE username='${username}'));`,

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
