/**
 * Product Service
 */
const mongoose = require('mongoose');
const ProductModel = require('../../app/Models/Product');


let ProductServiceModule = (function() {

	return {

		all: function(params) {
			let skip = 0, limit = 20;

			if(params && params.page){
				skip = limit*(params.page-1);
			}

			return ProductModel.find().skip(skip).limit(20).then((result)=>{
				return {
					"code": 200,
					"message": result
				};
			}).catch((error)=>{
				throw error;
			});
		},

		get: function(productId) {
			return ProductModel.findOne({_id: productId}).then((result)=>{
				return (result)?{
					"code": 200,
					"message": result
				}: {
					"code": 404,
					"message": {"msg" : "product not found"}
				};
			}).catch((error)=>{
				throw error;
			});	
		},

		create: function(productDetails) {
			let product = new ProductModel(productDetails)
			return product.save().then((result)=>{
				return {
					"code": 200,
					"message": result
				};
			}).catch((error)=>{
				throw error;
			});
		},

		update: function(productId, product) {
			return ProductModel.updateOne({_id: productId}, product).then((result)=>{
				return {
					"code": 204,
				};
			}).catch((error)=>{
				throw error;
			});
		},

		delete: function(productId) {
			return ProductModel.deleteOne({_id: productId}).then((result)=>{
				return {
					"code": 204,
				};
			}).catch((error)=>{
				throw error;
			}); 
		},

		search: function(queryString) {
			return ProductModel.find({name: { "$regex": queryString, "$options": "i" }}).then((result)=>{
				console.log(result);
				return {
					"code": 200,
					"message": result
				};
			}).catch((error)=>{
				throw error;
			});
		}

	}

})();

module.exports = ProductServiceModule;