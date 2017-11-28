/**
 * module for ntializing all service required by app
 */

let Module = (function() {

	/**
	 * private mehtod for intializing service
	 * @return collection of promises
	 */
	let intializeServices = function () {
		let promiseStack = [];

		//checks if mongo connection required by app
		if (process.env.DB_CONNECTION === 'mongo') {

			let mongoConnectionPromise = require('./intializers/mongo');

			promiseStack.push(mongoConnectionPromise);
		}

		//checks if redis connection required by app
		if (process.env.QUEUE_DRIVER === 'redis') {
			let redisConnectionPromise = require('./intializers/redis');

			promiseStack.push(redisConnectionPromise);
		}

		return promiseStack;
	}

	/**
	 * method for exposing the functionality of module
	 */
	return {
		intialize : function () {
			return intializeServices();
		}	
	}
})();

module.exports = Module.intialize;
