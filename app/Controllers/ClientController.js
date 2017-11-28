/**
 * ClientController
 */
const ClientService = require('../Services/ClientService');
const Controller = require('./Controller');

let ClientController = (function(){
	let __self = this;
	return {
		/**
		 * Login method
		 * @param  request, response
		 * @return json
		 */
		login: function(request, response) {
			this.validateRequest(request, response);

			let params = request.body;

			let resultPromise = ClientService.login(params);
			resultPromise.then((result) => {
				response.status(result.code)
					.json(result.message);
			}).catch((error) =>{
				console.log(error.name+":- "+error.message);
				response.sendStatus(503);
			});
		},

		/**
		 * Register method
		 * @param  request, response
		 * @return json
		 */
		register: function(request, response) {
			this.validateRequest(request, response);

			let params = request.body;

			let resultPromise = ClientService.register(params);
			resultPromise.then((result) => {
				response.status(result.code)
					.json(result.message);
			}).catch((error) =>{
				console.log(error.name+":- "+error.message);
				response.sendStatus(503);
			});
		},

		/**
		 * Access token method
		 * @param  request, response
		 * @return json
		 */
		accessToken: function(request, response) {
			
  		let refresh_token = request.headers['x-refresh-token'];
  		
  		if (!refresh_token) {
		    return response.status(403).send({ 
		        message: 'No token provided.' 
		    });
  		} 
			let resultPromise = ClientService.accessToken(refresh_token);
			resultPromise.then((result) => {
				response.status(result.code)
					.json(result.message);
			}).catch((error) =>{
				console.log(error.name+":- "+error.message);
				response.sendStatus(503);
			});
		}
	}

})()


ClientController.__proto__ = Object.create(Controller.prototype);

module.exports = ClientController;