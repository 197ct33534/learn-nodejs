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
module.exports = corsOptions