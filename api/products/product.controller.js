

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

exports.index = (req, res) => {
	return res.json(products);
};

exports.show = (req, res) => {
	const id = parseInt(req.params.id, 10);
	if(!id){
		return res.status(400).json({error : 'Incorrect id'});
	}

	let product = products.filter(product => product.id === id)[0];
	if(!product){
		return res.status(404).json({error : 'Unknown product'});
	}

	return res.json(product);
};

exports.destroy = (req, res) => {
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
};

exports.create = (req, res) => {
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
};