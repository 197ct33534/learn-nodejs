// steam này dành cho làm việc với 1 file lớn
const fs = require('fs');

const rs = fs.createReadStream('./files/lorem.txt', {encoding: 'utf8'});

const ws = fs.createWriteStream('./files/new-lorem.txt');

// rs.on('data', (data) => ws.write(data));

// or
rs.pipe(ws);
