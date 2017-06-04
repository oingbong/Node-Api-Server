const express = require('express');
const app = express();
const bodyParser = require('body-parser');



app.get('/', (req, res) => {
	res.send('Hello World!\n');
});

app.listen(3001, () => {
	console.log('Example app listening on port 3001!');
});

// 라우팅 설정

// 전체 리스트 조회
app.get('/products', (req, res) => {
	return res.json(products);
});

// 특정 상품 조회
app.get('/products/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);
	if(!id){
		return res.status(400).json({error : 'Incorrect id'});
	}

	let product = products.filter(product => product.id === id)[0];
	if(!product){
		return res.status(404).json({error : 'Unknown product'});
	}

	return res.json(product);
});

// 특정 상품 제거
app.delete('/products/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);
	if(!id){
		return res.status(400).json({error : 'Incorrect id'});
	}

	const productIdx = products.findIndex(product => product.id === id);
	if(productIdx === -1){
		return res.status(404).json({error : 'Unknown product'});
	}

	products.splice(productIdx, 1);
	res.status(204).send();
});

/*
	bodyParser = 미들웨어
	express 객체에 이 미들웨어를 추가하여 사용
	미들웨어 추가 할 때 사용하는 express 객체의 함수 = use()
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

// 상품 생성
app.post('/products', (req, res) => {

	const name = req.body.name || '';
	if(!name.length){
		return res.status(400).json({error : 'Incorrect name'});
	}

	// 현재 데이터 기준 id 값보다 1 더 큰 id 를 만들기 위한 작업
	const id = products.reduce((maxId, product) => {
		return product.id > maxId ? product.id : maxId
	}, 0) +1;

	// 배열에 상품 추가
	const newProduct = {
		id : id,
		name : name
	};
	products.push(newProduct);

	return res.status(201).json(newProduct);
});


// 임시 데이터
let products = [
	{
		id : 1,
		name : 'tera'
	},
	{
		id : 2,
		name : '8percent'
	},
	{
		id : 3,
		name : 'villy'
	}	
];