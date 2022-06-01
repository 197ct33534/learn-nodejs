const userDB = {
  users: require('../model/users.json'),
  setUsers: function (Data) {
    this.users = Data;
  },
};

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = userDB.users.find((person) => person.refreshToken === refreshToken);
  if (!foundUser) return res.sendStatus(403); // forbidden
  jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SERRET, (error, decoded) => {
    if (error || foundUser.username !== decoded.username) {
      return res.sendStatus(403);
    }
    const accessToken = jwt.sign({username: decoded.username}, process.env.ACCESS_TOKEN_SERRET, {
      expiresIn: '30s',
    });
    res.json({accessToken});
  });
};

module.exports = {handleRefreshToken};
