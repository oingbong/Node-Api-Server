const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.get('/', (req, res) => {
	res.send('Hello World!\n');
});

app.listen(3001, () => {
	console.log('Example app listening on port 3001!');

	/*
		DB Sync
		force : true => sync() 함수 실행되면 무조건 테이블을 새로 만드는 옵션
		force : false=> DB에 Table 있을 경우 다시 만들지 않는 기능
		개발용 = {force : true}
		운영용 = {force : false}
	*/
	require('./models').sequelize.sync({force: true})
		.then(() => {
			console.log('Databases sync');
		});
});

app.use('/products', require('./api/products'));

module.exports = app;