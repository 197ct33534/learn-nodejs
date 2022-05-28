const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 5000;

app.get('^/$|index(.html)?', (req, res) => {
  // res.sendFile('./views/index.html', {root: __dirname});
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});
app.get('/old-page(.html)?', (req, res) => {
  res.redirect(301, '/new-page.html');
});
// route hnadlers
app.get(
  '/hello(.html)?',
  (req, res, next) => {
    console.log('say hi');
    next();
  },
  (req, res) => {
    res.send('<h1> hello anh em</h1>');
  }
);
const one = (req, res, next) => {
  console.log('one');
  next();
};
const two = (req, res, next) => {
  console.log('two');
  next();
};
const three = (req, res, next) => {
  console.log('three');
  res.send('<h3> one two three</h3>');
};
app.get('/chain(.html)?', [one, two, three]);
app.get('/*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
