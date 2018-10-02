const express = require('express');

const app = require('./server');

const port = process.env.PORT || 3000;

const mainApp = express()
  .use((req, res) => app.handle(req, res))
  .listen(port, function(err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`> Started on port ${port}`);
  });

module.exports = {
    mainApp
}