const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')

//connect database
mongoose.connect(process.env.DB_URL)

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const moviesRouter = require('./routes/movies');
const watchlistRouter = require('./routes/watchlist')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/movies', moviesRouter)
app.use('/api/watchlist', watchlistRouter)

module.exports = app;
