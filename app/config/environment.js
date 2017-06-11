const environments = {
	development : {
		mysql : {
			username : 'root',
			password : '',
			database : 'db_invest_dev'
		}
	},

	test : {
		mysql : {
			username : 'root',
			password : '',
			database : 'db_invest_test'
		}
	},

	production : {
		mysql : {
			username : 'root',
			password : '',
			database : 'db_invest'
		}
	}
}

const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = environments[nodeEnv];