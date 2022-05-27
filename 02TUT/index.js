const fs = require('fs');
const path = require('path');
const fsPromise = require('fs').promises;
const link = path.join(__dirname, 'files', 'fileChildren', 'hello.txt');

/*
// part 1

// reading files
fs.readFile(link, 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});
// write files
const content = 'nice to meet you';
fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), content, (err, data) => {
  if (err) throw err;
  console.log('write complete');
});

fs.appendFile(path.join(__dirname, 'files', 'test.txt'), 'test...', (err, data) => {
  if (err) throw err;
  console.log('append complete');
});

*/

/*
//part2

// callback hell
fs.readFile(link, 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data.toString());
  const content = 'nice to meet you';
  fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), content, (err, data) => {
    if (err) throw err;
    console.log('write complete');
  });
  fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\ntest...', (err, data) => {
    if (err) throw err;
    console.log('append complete');
    fs.rename(
      path.join(__dirname, 'files', 'reply.txt'),
      path.join(__dirname, 'files', 'newreply.txt'),
      (err, data) => {
        if (err) throw err;
        console.log('rename complete');
      }
    );
  });
});
*/

const fileOps = async () => {
  try {
    const data = await fsPromise.readFile(link);
    console.log(data.toString());
    const content = 'nice to meet you promise';
    await fsPromise.writeFile(path.join(__dirname, 'files', 'reply.txt'), content);
    await fsPromise.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\ntest...');
    await fsPromise.rename(
      path.join(__dirname, 'files', 'reply.txt'),
      path.join(__dirname, 'files', 'newreply.txt')
    );
    const newdata = await fsPromise.readFile(path.join(__dirname, 'files', 'newreply.txt'));
    console.log(newdata.toString());
  } catch (error) {
    console.log(error);
  }
};
fileOps();
// exit on uncaught errors
process.on('uncaughtException', (err) => {
  console.log(` chương  trình đang bị lỗi: ${err}`);
  process.exit(1);
});
