const userDB = {
  users: require('../model/users.json'),
  setUsers: function (Data) {
    this.users = Data;
  },
};
const fsPromise = require('fs').promises;
const path = require('path');
const handleLogout = async (req, res) => {
  //on client,also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // no content .
  const refreshToken = cookies.jwt;
  // is regreshToken in db ?
  const foundUser = userDB.users.find((person) => (person.refreshToken = refreshToken));
  if (!foundUser) {
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
    return res.sendStatus(204);
  }
  // delete refreshToken in db .
  const otherUsers = userDB.users.filter((user) => user.refreshToken !== foundUser.refreshToken);
  const currentUser = {...foundUser, refreshToken: ''};
  userDB.setUsers([...otherUsers, currentUser]);
  await fsPromise.writeFile(
    path.join(__dirname, '..', 'model', 'users.json'),
    JSON.stringify(userDB.users)
  );
  res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true}); // secure :true - only serve on https
  res.sendStatus(204);
};
module.exports = {handleLogout};
