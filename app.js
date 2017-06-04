const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.get('/', (req, res) => {
	res.send('Hello World!\n');
});

app.listen(3001, () => {
	console.log('Example app listening on port 3001!');
});

app.use('/products', require('./api/products'));

module.exports = app;