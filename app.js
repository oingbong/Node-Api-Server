const express = require('express');
const app = express();

app.use('/products', require('./app/api/products'));

module.exports = app;