const express = require('express');
const app = express();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const signupRouter = require('./routes/signup');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter );