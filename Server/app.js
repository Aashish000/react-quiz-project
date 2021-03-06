var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var indexRouter = require('./routes/index');
var RegisterUsersRouter = require('./routes/Insertusers');
var testAPIRouter = require("./routes/testAPI");
var loginRouter = require("./routes/login");
var createQuiz = require("./routes/createQuiz");
var getQuestion = require("./routes/getQuestion");
var getResult = require("./routes/getResult");
var uploadAnswer = require("./routes/uploadAnswer");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/RegisterUsers', RegisterUsersRouter);
app.use("/testAPI", testAPIRouter);
app.use("/login", loginRouter);
app.use("/createQuiz", createQuiz);
app.use("/getQuestion", getQuestion);
app.use("/uploadAnswer", uploadAnswer);
app.use("/getResult",getResult);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

//mongodb connection, see mongodb collections in the Server/models folder
var mongoose = require('mongoose')
//var url = "mongodb+srv://Henan:cecilia1996@ppc.x8ose.mongodb.net/UserDB?retryWrites=true&w=majority";
var url = "mongodb+srv://mettle:w2k_pass@ppc.ncydd.mongodb.net/myCollections?retryWrites=true&w=majority";
//var url = 'mongodb://127.0.0.1:27017'; not using local mongodb service

const options = {
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
};

mongoose.connect(url, options).then(
  () => { console.log("mongoDB connected"); },
  err => { console.log(err); }
);

const db = mongoose.connection

db.on('error', err => {
  console.error('connection error:', err)
})


module.exports = app;
