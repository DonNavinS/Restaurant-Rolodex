const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();

const createToken = (user) => {
  const accessToken = sign(
    {
      username: user.username,
    },
    "THISISTHESECRETSTRING"
  );
  return accessToken;
};

const checkToken = (req, res, next) => {
  const accessToken = req.cookies["access_token"];

  if (!accessToken) {
    return res.send("NO ACCESS TOKEN IN COOKIES");
  }

  try {
    const validToken = verify(accessToken, "THISISTHESECRETSTRING");
    if (validToken) {
      req.token = true;
      return next();
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports = { createToken, checkToken };
