const fs = require('fs');
const path = require('path');
// create mkdir
// fs.mkdir(path.join(__dirname, 'newdir'), (err) => {
//   if (err) throw err;
// });

if (!fs.existsSync('./newdir')) {
  fs.mkdir('./newdir', (err) => {
    if (err) throw err;
    console.log('complete create dir');
  });
} else {
  fs.rmdir('./newdir', (err) => {
    if (err) throw err;
    console.log('complete remove dir');
  });
}
