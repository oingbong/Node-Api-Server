const express = require('express');
const app = express();

app.use('/products', require('./api/products'));

module.exports = app;