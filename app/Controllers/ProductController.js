/**
 * Product Controller
 */
const Controller = require('./Controller');
const ProductService = require('../Services/ProductService');

let ProductController = (function(){
	
	return {
		/**
		 * Get all product from db
		 * @param request, response
		 * @return json
		 */
		getAll: function(request, response) {

			let params = request.query;

			let resultPromise = ProductService.all(params);
			
			resultPromise.then((result) => {
				response.status(result.code)
					.json(result.message);
			}).catch((error)=>{
				console.log(error.name+":- "+error.message);
				response.sendStatus(503);
			});

		},

		/**
		 * get product form db
		 * @param  request, response  
		 * @return json
		 */
		get: function(request, response) {

			let product_id = request.params.id;

			let resultPromise = ProductService.get(product_id);

			resultPromise.then((result) => {
				response.status(result.code)
					.json(result.message);
			}).catch((error)=>{
				console.log(error.name+":- "+error.message);
				response.sendStatus(503);
			});
		},

		/**
		 * create new product form db
		 * @param  request, response 
		 * @return view
		 */
		create: function(request, response) {
			this.validateRequest(request, response);
	
			let params = request.body;

			let resultPromise = ProductService.create(params);
				
			resultPromise.then((result) => {
				response.status(result.code)
					.json(result.message);
			}).catch((res)=>{
				console.log(error.name+":- "+error.message);
				response.sendStatus(503);
			});
		},

		/**
		 * update product form db
		 * @param  request, response 
		 * @return view
		 */
		update: function(request, response) {

			let product_id = request.params.id;
			
			this.validateRequest(request, response);

			let product_details = request.body;
			
			let resultPromise = ProductService.update(product_id, product_details);
				
			resultPromise.then((result) => {
				response.sendStatus(result.code)
			}).catch((res)=>{
				console.log(error.name+":- "+error.message);
				response.sendStatus(503);
			});
		},

		/**
		 * delete product form db
		 * @param  request, response 
		 * @return view
		 */
		delete: function(request, response) {
			let product_id = request.params.id;

			let resultPromise = ProductService.delete(product_id);
				
			resultPromise.then((result) => {
				response.sendStatus(result.code);
			}).catch((error)=>{
				console.log(error.name+":- "+error.message);
				response.sendStatus(503);
			});
		},

		/**
		 * search product by name form db
		 * @param  request, response 
		 * @return view
		 */
		search: function(request, response) {
			let queryString= request.params.id;

			let resultPromise = ProductService.search(queryString);

			resultPromise.then((result) => {
				response.status(result.code)
					.json(result.message);
			}).catch((error)=>{
				console.log(error.name+":- "+error.message);
				response.sendStatus(503);
			});
		}

	}
})()

ProductController.__proto__ = Object.create(Controller.prototype);

module.exports = ProductController;