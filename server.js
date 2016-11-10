

if(process.argv[3] === "dev"){
  process.env.NODE_ENV = "development";
}

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var favicon = require('serve-favicon');

var app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'prod'));

app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname,'prod','favicon.ico')));
app.use(express.static(path.join(__dirname, './prod')));
app.use(express.static(path.join(__dirname, './server/public')));


require('./server/routes.js')(app);

app.use('/', function(req, res) {
	res.render("index.html");
});


var port = process.argv[2] || 3000;
app.listen(port);
console.log("server is listening on port " + port);

module.exports = app;
