const should = require('should');
const request = require('supertest');
const app = require('../../app');
const syncDatabase = require('../../bin/sync-database'); // DB sync Module
const models = require('../../models'); // DB Connect

describe('GET /products', () => {

	// test DB sync
	before('sync database', (done) => {
		// sync data base
		syncDatabase().then(() => {
			done();
		});
	});

	const products = [
		{name : 'siso'},
		{name : 'beyond'},
		{name : 'people'}
	];

	/*
		sequelize 모델에는 두종류 함수 : create(), bulkCreate()
		create() - 하나의 로우 생성 함수
		bulkCreate() - 여러개 데이터를 배열로 받아 여러개 로우 생성 함수
	*/
	before('insert 3 products into databse', (done) => {
		models.Product.bulkCreate(products).then(() => done());
	});

	after('clear up databse', (done) => {
		syncDatabase().then(() => done());
		console.log('delete test Data');
	});

	it('should return 200 status code(GET)', (done) => {
		request(app)
		.get('/products')
		.expect(200)
		.end((err, res) => {
			if(err) throw err;
			done();
		});
	});

	it('should return array', (done) => {
		request(app)
		.get('/products')
		.expect(200)
		.end((err, res) => {
			if(err) throw err;
			res.body.should.be.an.instanceof(Array).and.have.length(3);
			res.body.map(product => {
				product.should.have.properties('id', 'name');
				product.id.should.be.a.Number();
				product.name.should.be.a.String();
			});
		done();
		});
	});


});

// describe('PUT /products/:id', () => {
// 	it.only('should return 200 status code(PUT)', (done) => {
// 		request(app)
// 			.put('/products/1')
// 			.send({
// 				name : 'foo'
// 			})
// 			.end((err, res) => {
// 				if(err) throw err;
// 				done();
// 			});
// 	});
// });