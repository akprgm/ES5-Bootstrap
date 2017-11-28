const config = function(process.env.APP_ENV){
	switch(env){
		case 'production': 
			return 'environments/production.json';
		case 'testing':
			return 'environments/testing.json';
		case 'local':
			return 'environments/local.json';
		default:
			process.exit(1);
	}
}

module.exports = config;
