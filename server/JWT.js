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

module.exports = { createToken };
