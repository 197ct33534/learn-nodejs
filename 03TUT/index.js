const {format} = require('date-fns');
const {v4: uuidv4} = require('uuid');
console.log(format(new Date(), 'dd-MM-yyyy'));
console.log(uuidv4());
