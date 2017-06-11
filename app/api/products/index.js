const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const controller = require('./product.controller');

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

// 라우팅 설정

// 전체 리스트 조회
router.get('/', controller.index);

// 특정 상품 조회
router.get('/:id', controller.show);

// 특정 상품 제거
router.delete('/:id', controller.destroy);

/*
	bodyParser = 미들웨어
	express 객체에 이 미들웨어를 추가하여 사용
	미들웨어 추가 할 때 사용하는 express 객체의 함수 = use()
*/
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended : true }));

// 상품 생성
router.post('/', controller.create);

// 상품 변경
router.put('/:id', controller.update);

module.exports = router;