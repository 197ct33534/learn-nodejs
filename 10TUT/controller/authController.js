const userDB = {
  users: require('../model/users.json'),
  setUsers: function (Data) {
    this.users = Data;
  },
};
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
    res.json({success: `user ${user} is logged in`});
  } else {
    res.sendStatus(401);
  }
};

module.exports = {handleLogin};
