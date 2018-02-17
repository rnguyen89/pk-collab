'use strict';

const express = require('express');
const morgan = require('morgan');

const app = express();

const taskRouter = require('./task/router');

app.use(express.static('public'));
app.use('/task', taskRouter);


if (require.main === module) {
  app.listen(process.env.PORT || 8080, function () {
    console.info(`App listening on ${this.address().port}`);
  });
}

module.exports = app;


