/**
 * Helper module
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const HelperModule = (function() {

	let SaltRounds = 10;
	let ExpireTime = '1d';

	return {
		/**
		 * Generates hash of give value
		 * @param  string value
		 * @return hash
		 */
		generateHash: function(value) {
			return bcrypt.hash(value, SaltRounds);
		},

		/**
		 * Generates unique token
		 * @param  timeToLive
		 * @return token
		 */
		generateToken: function(obj, expire = false){
			return (expire)?jwt.sign(obj, process.env.APP_KEY,{expiresIn: ExpireTime}): jwt.sign(obj, process.env.APP_KEY);
		}
	}
})();

module.exports = HelperModule;