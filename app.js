const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const port = 3000;
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/profiles";


// const indexRouter = require('./routes/index');
// const teamsRouter = require('./routes/teams');
// const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

var db;

MongoClient.connect(url, function(err, database) {
  if (err) throw err;
  db = database;
  app.listen(8080);
  console.log('listening on 8080');
});

// app.use('/', indexRouter);
// app.use('/teams', teamsRouter);
// app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/teams', (req, res) => {
  res.render('teams')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/signup', (req, res) => {
  res.render('signup')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.send("404 - This page does not exist");
  // next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, function() {
  console.log("Server is listening")
})

module.exports = app;
