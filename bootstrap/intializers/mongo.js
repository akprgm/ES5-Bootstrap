const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
/**
 * module for creating mongodb connection 
 */
let Module = (function () {
 	let instance;

 	/**
 	 * private method for creating connection instance
 	 * @return mongo connection
 	 */
 	function createInstance() {
 		let connectionUrl = 'mongodb://'+process.env.DB_USERNAME+':'+process.env.DB_PASSWORD+'@'+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_DATABASE;
 		
 		return mongoose.connect(connectionUrl);
 	}

 	return {
 		getInstance: function () {
 			let promiseObj = new Promise((resolve, reject)=>{
 				if (!instance) {
 					instance = createInstance();
 				}

 				if (instance) {
 					resolve(instance);
 				} else {
 					reject("Unable to create connection with mongodb, please make sure mongodb server is running.");
 				}

 			})

 			return promiseObj;
 		}
 	};
})();

module.exports = Module.getInstance();
