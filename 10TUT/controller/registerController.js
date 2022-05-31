const userDB = {
  users: require('../model/users.json'),
  setUsers: function (Data) {
    this.users = Data;
  },
};
const fsPromise = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const {user, pwd} = req.body;

  if (!user || !pwd) return res.status(400).json({message: 'chưa có tk và mk'});
  // check for duplication username in the db ;
  const duplicate = userDB.users.find((person) => person.username === user.username);
  if (duplicate) return res.sendStatus(400);
  try {
    const hashPassword = await bcrypt.hash(pwd, 10);
    // store the password ,

    const newUser = {username: user, password: hashPassword};

    userDB.setUsers([...userDB.users, newUser]);
    await fsPromise.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(userDB.users)
    );
    console.log(userDB.users);
    res.status(201).json({message: `create new user ${user} success`});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};
module.exports = handleNewUser;
