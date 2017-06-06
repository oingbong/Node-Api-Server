const app = require('../app');
const port = 3001;
const syncDatabase = require('./sync-database');

app.listen(port, () => {
	console.log('Example app listening on port 3001');

	syncDatabase().then(() => {
		console.log('Database sync');
	});
});