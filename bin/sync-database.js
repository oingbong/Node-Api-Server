const models = require('../models');
/*
	DB Sync
	force : true => sync() 함수 실행되면 무조건 테이블을 새로 만드는 옵션
	force : false=> DB에 Table 있을 경우 다시 만들지 않는 기능
	개발용 = {force : true}
	운영용 = {force : false}
*/
module.exports = () => {
	return models.sequelize.sync({force : true});
};