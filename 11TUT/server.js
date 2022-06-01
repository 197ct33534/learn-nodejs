const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const {logger} = require('./middleware/logEvents');
const {errorHandle} = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/veriftJWT');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
// custom middlewarte logger
app.use(logger);
//cross orgin resource sharing

app.use(cors(corsOptions));
//built-in middleware to handle urlencoded data
// in other words , form data:
// 'content-type: application/x-www-form-urlencoded'

app.use(express.urlencoded({extended: false}));
// built-in middle for json
app.use(express.json());
// middleware for cookies
app.use(cookieParser());
//server static files
app.use('/', express.static(path.join(__dirname, 'public')));

//router
app.use('/', require('./routes/root'));

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
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
