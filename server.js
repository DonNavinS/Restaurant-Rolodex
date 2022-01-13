const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const { createToken, checkToken } = require("./server/JWT");
const cookieParser = require("cookie-parser");
const path = require("path");

const db = mysql.createPool({
  host: "us-cdbr-east-05.cleardb.net",
  user: "b6a3b0afd0bdbd",
  password: "0aba06ee",
  database: "heroku_c053088a3022d84",
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/client/index.html"));
});

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
app.get("/total/:id", (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * FROM total WHERE user_id='${id}'`, (err, result) => {
    res.send(result);
    console.log(result);
    console.log("DATA RETRIEVED");
  });
});

app.post("/total/add", (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const username = req.body.username;
  const user_id = req.body.user_id;
  db.query(
    `INSERT INTO total (name, description, user_id) VALUES ('${name}', '${description}', (SELECT ID from users WHERE username='${username}'));`,
    (err, result) => {
      console.log("TOTAL TABLE UPDATED");
      console.log(err);
      res.send({
        idtotal: result.insertId,
        name: name,
        description: description,
        user_id: parseInt(user_id),
      });
    }
  );
});

app.delete("/total/remove/:id", (req, res) => {
  const id = req.params.id;
  db.query(`DELETE FROM total WHERE idtotal = '${id}'`, (err, result) => {
    console.log("ITEM DELETED");
    console.log(err);
  });
  res.send({ id: id });
});

app.put("/total/update/name/:id", (req, res) => {
  const id = req.params.id;
  const newName = req.body.newName;
  db.query(`UPDATE total SET name='${newName}' WHERE idtotal ='${id}'`);
});

app.put("/total/update/description/:id", (req, res) => {
  const id = req.params.id;
  const newDesc = req.body.newDesc;
  db.query(`UPDATE total SET description='${newDesc}' WHERE idtotal ='${id}'`);
});

// ROUTES FOR TRIED TABLE
app.get("/tried/:id", (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * FROM tried WHERE user_id='${id}'`, (err, result) => {
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
      res.send({
        idtried: result.insertId,
        name: name,
        description: description,
        username: username,
      });
    }
  );
});

app.delete("/tried/remove/:id", (req, res) => {
  const id = req.params.id;
  db.query(`DELETE FROM tried WHERE idtried = '${id}'`);

  res.send({ idtried: id });
});

app.put("/tried/update/name/:id", (req, res) => {
  const id = req.params.id;
  const newName = req.body.newName;
  db.query(`UPDATE tried SET name='${newName}' WHERE idtried ='${id}'`);
});

app.put("/tried/update/description/:id", (req, res) => {
  const id = req.params.id;
  const newDesc = req.body.newDesc;
  db.query(`UPDATE tried SET description='${newDesc}' WHERE idtried ='${id}'`);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
