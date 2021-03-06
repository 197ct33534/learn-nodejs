const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const {logger} = require('./middleware/logEvents');
const {errorHandle} = require('./middleware/errorHandler');
const PORT = process.env.PORT || 5000;
// custom middlewarte logger
app.use(logger);
//cross orgin resource sharing
const whitelist = ['https://www.yoursite.com', 'http://localhost:5000', 'http://127.0.0.1:5000'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('not allowed by cross'));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
//built-in middleware to handle urlencoded data
// in other words , form data:
// 'content-type: application/x-www-form-urlencoded'

app.use(express.urlencoded({extended: false}));
// built-in middle for json
app.use(express.json());
//server static files
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/subdir', express.static(path.join(__dirname, 'public')));
//router
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employes'));

// app.use('/'
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({error: '404 not found'});
  } else {
    res.type('txt').send('404 not found');
  }
});
app.use(errorHandle);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
