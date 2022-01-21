var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// custom libs
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const hpp = require("hpp");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const corsOptions = {
    origin: "http://127.0.0.1:3000",
    methods: "GET,PUT,POST,DELETE",
    allowedHeaders: ["Content-Type"]
}

// custom middleware
app.use(hpp());
app.use(helmet());
app.use(mongoSanitize());
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// custom constanta
const connection = require("./connection");

module.exports = app;
