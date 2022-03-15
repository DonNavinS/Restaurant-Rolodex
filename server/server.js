const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const { sign, verify } = require("jsonwebtoken");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "LaptopWaterParis1027$",
  database: "rest-rolo",
});

// const db = mysql.createPool({
//   host: "us-cdbr-east-05.cleardb.net",
//   user: "b6a3b0afd0bdbd",
//   password: "0aba06ee",
//   database: "heroku_c053088a3022d84",
// });
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

const buildFolder = path.join(__dirname, "..", "client", "dist");

app.use("/", express.static(buildFolder));

// JWT MIDDLEWARE
const checkToken = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  verify(token, "JWTSECRET", (err, result) => {
    if (err) return res.send("Cannot verify JWT");

    req.result = result;
    console.log(result);
    next();
  });
};

// ROUTES FOR SIGNUP AND LOGIN
app.post("/api/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    `INSERT INTO users (username, password) VALUES ('${username}','${password}');`,
    (err, result) => {
      console.log(`NEW USER (${username}) ADDED `);
      res.send(result);
    }
  );
});

app.post("/api/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await db
    .promise()
    .query(`SELECT * FROM users WHERE username='${username}'`);

  if (user[0][0] === undefined || user[0][0].password !== password) {
    res.send("Invalid Credentials");
  } else if (
    user[0][0].username === username &&
    user[0][0].password === password
  ) {
    const token = sign(
      { username: user[0][0].username, user_id: user[0][0].ID },
      "JWTSECRET"
    );
    res.send({ token, user_id: user[0][0].ID });
  }
});

// ROUTES FOR BOTH TABLES
app.get("/api/:table/:id", checkToken, (req, res) => {
  console.log(req.result);
  const id = req.params.id;
  const tableType = req.params.table;
  db.query(
    `SELECT * FROM ${tableType} WHERE user_id='${id}'`,
    (err, result) => {
      res.send(result);
      console.log(result);
      console.log("DATA RETRIEVED");
    }
  );
});

app.post(`/api/:table/add`, (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const username = req.body.username;
  const user_id = req.body.user_id;
  const tableType = req.params.table;
  db.query(
    `INSERT INTO ${tableType} (name, description, user_id) VALUES ("${name}", "${description}", (SELECT ID from users WHERE username="${username}"));`,
    (err, result) => {
      console.log(`${tableType} TABLE UPDATED`);
      console.log(err);
      res.send({
        id: result.insertId,
        name: name,
        description: description,
        user_id: parseInt(user_id),
      });
    }
  );
});

app.delete("/api/:table/remove/:id", (req, res) => {
  const id = req.params.id;
  const tableType = req.params.table;
  db.query(`DELETE FROM ${tableType} WHERE id = '${id}'`, (err, result) => {
    console.log("ITEM DELETED");
  });
  res.send({ id: id });
});

app.put("/api/:table/update/:id", (req, res) => {
  const id = req.params.id;
  const newName = req.body.name;
  const newDescription = req.body.description;
  const tableType = req.params.table;
  db.query(
    `UPDATE ${tableType} SET name='${newName}', description='${newDescription}' WHERE id ='${id}'`
  );
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
