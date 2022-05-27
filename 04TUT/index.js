const log = require('./logEvents');

const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmit = new MyEmitter();
// add a listener event name log
myEmit.on('log', (mes) => log(mes));
setTimeout(() => {
  myEmit.emit('log', 'test login');
}, 3000);
