var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
//var handlebars = require('handlebars')

var indexRouter = require('./routes/index');
var peopleRouter = require('./routes/people');
var resultRouter = require('./routes/result');
var orderRouter = require('./routes/orderform');
var aboutRouter = require('./routes/about');
var productsRouter = require('./routes/products');
var contactusRouter = require('./routes/contact_us');
var loginRouter = require('./routes/login');
var adminRouter = require('./routes/admin');
var aboutRouter = require('./routes/about');
var logoutRouter = require('./routes/logout');
//var celestRouter = require('./routes/celest');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'public'));
//app.set('view engine', 'html');
var engines = require('consolidate');

app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/people', peopleRouter);
app.use('/result', resultRouter);
app.use('/orderform', orderRouter);
app.use('/login', loginRouter);
app.use('/products', productsRouter);
app.use('/admin', adminRouter);
app.use('/contact_us', contactusRouter);
app.use('/about', aboutRouter);
app.use('/logout', logoutRouter);


app.use(express.static('public'))
app.use("/login", express.static(__dirname + '/views/login.html'));
app.use("/order", express.static(__dirname + '/views/order.html'));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err.message);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});






module.exports = app;
