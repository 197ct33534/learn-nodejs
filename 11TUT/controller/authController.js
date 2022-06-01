const userDB = {
  users: require('../model/users.json'),
  setUsers: function (Data) {
    this.users = Data;
  },
};
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromise = require('fs').promises;
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
  const {user, pwd} = req.body;
  if (!user || !pwd) return res.status(400).json({message: 'chưa có tk và mk'});
  const foundUser = userDB.users.find((person) => person.username === user);
  if (!foundUser) return res.sendStatus(404); // unauthorized
  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    // create jwt
    const accessToken = jwt.sign({username: foundUser.username}, process.env.ACCESS_TOKEN_SERRET, {
      expiresIn: '30s',
    });
    // note: refreshToken save db
    const refreshToken = jwt.sign({username: foundUser.username}, process.env.ACCESS_TOKEN_SERRET, {
      expiresIn: '1d',
    });

    const otherUsers = userDB.users.filter((person) => person.username !== foundUser.username);
    const currentUser = {...foundUser, refreshToken: refreshToken};
    userDB.setUsers([...otherUsers, currentUser]);
    await fsPromise.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(userDB.users)
    );
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 100,
    });
    res.json({accessToken});
  } else {
    res.sendStatus(401);
  }
};

module.exports = {handleLogin};
