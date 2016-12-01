const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const api = require('./routes/api');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://node-from-scratch-burtonium.c9users.io');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

app.use(express.static('dist'));
// app.use(express.static('public/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  secret: 'ayylmao'
}));

require('./src/config/passport')(app);
app.use('/api/v1', api);

if (!module.parent) {
  app.listen(port, function(err) {
    if (err) {
      console.log(err);
    }
    console.log('running server on port ' + port);
  });
}

// dev error handler
if (process.env.NODE_ENV === 'test' ||
  process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


// production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;
