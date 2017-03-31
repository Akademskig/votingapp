var express=require("express");
var routes=require("./app/routes/index.js")
var mongoose = require('mongoose');
var passport = require('passport');//authentificatio nmodule: http://passportjs.org/docs/oauth
var session = require('express-session');
var localAuth=require('./app/config/passportLocal');
var bodyParser=require("body-parser");
var flash = require('connect-flash');
var app=express();

require('dotenv').load();//loads environment variables

require('./app/config/passportGit')(passport);//invoking password strategy with "passport" as a parameter
localAuth.localAuth(passport);

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

//controlers//
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));
app.use(flash());

//var views = path.join(__dirname + "/public", 'views');

app.set("view engine", "jade");
app.set('views', "public");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(session({
	secret: 'votingAppSecret',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});