const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');
const {format} = require('date-fns');
const {v4: uuidv4} = require('uuid');

const logEvent = async (mes, fileName) => {
  const datetime = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`;
  const logItem = `${datetime}\t${uuidv4()}\t${mes}\n`;
  console.log(logItem);
  try {
    if (!fs.existsSync('./logs')) {
      await fsPromise.mkdir(path.join(__dirname, '..', 'logs'));
    }
    await fsPromise.appendFile(path.join(__dirname, '..', 'logs', fileName), logItem);
  } catch (error) {
    console.log(error);
  }
};
const logger = (req, res, next) => {
  logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
  console.log(`${req.method} ${req.path}`);
  next();
};
module.exports = {logger, logEvent};
