const models = require('../../models');

exports.index = (req, res) => {
	models.Product.findAll()
		.then(products => res.json(products));
};

exports.show = (req, res) => {
	const id = parseInt(req.params.id, 10);
	if(!id){
		return res.status(400).json({error : 'Incorrect id'});
	};

	models.Product.findOne({
		where : {
			id : id
		}
	}).then(product => {
		if(!product){
			return res.status(404).json({error : 'No Product'});
		}

		return res.json(product);
	});
};

exports.destroy = (req, res) => {
	const id = parseInt(req.params.id, 10);
	if(!id){
		return res.status(400).json({error: 'Incorrect id'});
	};

	models.Product.destroy({
		where : {
			id : id
		}
	}).then(() => res.status(204).send());
};

exports.create = (req, res) => {
	const name = req.body.name || '';
	if(!name.length){
		return res.status(400).json({error : 'Incorrect name'});
	}

	models.Product.create({
		name : name
	}).then((product) => res.status(201).json(product));
};