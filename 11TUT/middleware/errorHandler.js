const {logEvent} = require('./logEvents');
const errorHandle = (error, req, res, next) => {
  logEvent(`${error.name}:${error.message}`, 'errLog.txt');
  console.error(error.stack);
  res.status(500).sendFile(err.message);
};
module.exports = {errorHandle};
