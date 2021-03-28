const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/index');
const PORT = process.env.PORT || 3000;
const homeRoute = require('./routes/homeRouter');

var app = express();
/* public file */
app.set('view engine', 'ejs');
app.use(express.static('public'));
/* view engine */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

/* connect database */
mongoose
  .connect(config.getConnectDatabase(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('Connect database successfully !'));

/* router */
app.use('/', homeRoute);
app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
