const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/smartPlugDB');

const app = express();

//Routes
const devices = require('./routes/devicesRouter');
const spaces = require('./routes/spacesRouter');
const buildings = require('./routes/buildingsRouter');

//Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());

//Routes
app.use('/devices', devices);
app.use('/spaces', spaces);
app.use('/buildings', buildings);

//Catch 404 Errors and forward then to error handle
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Error handle function
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;

  //Response to client
  res.status(status).json({
    error: {
      message: error.message
    }
  });

  //Response to ourselves
  console.error(err);
})

//Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server is listening on port' + port));
