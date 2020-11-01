const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// routes is a function
const routes = require('./routes/routes'); 
const app = express();

mongoose.Promise = global.Promise;
// only connect to our database if we are not running a test
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/muber');
} // no else statement here. see test_helper.js


// ORDER of this middleware is important

app.use(bodyParser.json());   //this line must always be above...
routes(app);                  // ... this line

app.use((err, req, res, next) => {
  // console.log(err);
  res.status(422).send({ error: err.message });
});

module.exports = app;