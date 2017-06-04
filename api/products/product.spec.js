const should = require('should');
const request = require('supertest');
const app = require('../../app');

describe('GET /products', () => {
	it('should return 200 status code', (done) => {
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