const Sequelize = require('sequelize');
const config = require('../config/environment');
const sequelize = new Sequelize(
	config.mysql.database,
	config.mysql.username,
	config.mysql.password
); // db name, id, pw

const Product = sequelize.define('product', {
	/*
		칼럼 정의
		id 는 자동 정의
		name 은 문자열로 정의
		또한, createdAt, updatedAt 자동 정의
		createdAt : 테이블 안에 로우(데이터) 생성 할 때마다 타임 정보 기록
		updateAt : 로우가 변경 될 때마다 칼럼 변경
	*/
	name : Sequelize.STRING
});

module.exports = {
	sequelize : sequelize,
	Product : Product
}