/**
 * sự khác biệt của nodejs với vanilla js 
 * 1) node chạy trên server chứ không phải browser (backend not front end)

*/
// // 2) console chạy trên teminal window
// console.log('hello server');
// //3) global object instead of window object
// // console.log(global);
// // 4 ) has common core modules that will explore other
// //5) commonjs modules instead of es6 modules
// const path = require('path');
// const os = require('os');
// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());
// // đường dẫn tới thư mục
// console.log(__dirname);
// // đường dẫn tới file name
// console.log(__filename);
// // use path
// // get path link mkdir
// console.log(path.dirname(__filename));
// //get name file
// console.log(path.basename(__filename));
// //get type file
// console.log(path.extname(__filename));

// //get object mkdir
// console.log(path.parse(__filename));

const {cong, tru, nhan, chia} = require('./math');
console.log(cong(2, 3));
console.log(tru(2, 3));
console.log(nhan(2, 3));
console.log(chia(2, 3));
