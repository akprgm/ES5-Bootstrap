/**
 * client Service module
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HelperModule = require('../Helpers');
const ClientModel = require('../Models/Client');

let ClientServiceModule = (function(){

	return {
		/**
		 * Login Method
		 * @param  params
		 * @return json
		 */
		login: function(params) {

			return ClientModel.findOne({"email": params.email}).then( (result) => {
				
				if (!result) {
					return {
						"code": 404,
						"message": {"msg": "user not found"}
					}
				}

				let client = result.toObject();
			
				return bcrypt.compare(params.password, client.password).then((pwdMatch)=>{
					if (pwdMatch) {
						//generate new refresh and access token 
						client.access_token = HelperModule.generateToken({email:client.email, time: (new Date).getTime()}, true);
						
						client.refresh_token = HelperModule.generateToken({email:client.email, access_token: client.access_token});
						
						return ClientModel.update({"email": client.email}, {"$set": {"refresh_token": client.refresh_token, "access_token": client.access_token}}, {"upsert":false}).then((updatedResult)=>{
							delete client._id;
							delete client.password;
							return {
								"code": 200,
								"message": client
							};

						});
					} else {
						return {
							"code": 401,
							"message": {"msg": "Invalid Email or Password"}
						};
					}
				})

			}).catch((error)=>{
				throw error;
			});

		},

		/**
		 * Register Method
		 * @param  params
		 * @return json
		 */
		register: function(params) {

			return ClientModel.findOne({"email": params.email}).then( (result) => {
				if (result) {
					return {
						"code": 409,
						"message": {"msg": "user with this email already exists"}
					}
				}
				return HelperModule.generateHash(params.password).then((result)=>{
					let client = { 
						"email": params.email,
						"password": result
					};					
					client.access_token  = HelperModule.generateToken({email:client.email, time: (new Date).getTime()}, true),
					client.refresh_token = HelperModule.generateToken({email:client.email, access_token: client.access_token})	
					
					let Client = new ClientModel(client);

					return Client.save().then((result)=>{
						delete client.password;
						return {
							"code": 200,
							"message": client
						};
					});
				}).catch((error)=>{
					throw error;		
				})

			}).catch((error)=>{
				throw error;
			});
		},

		/** 
		 * Generates new access token
		 * @param params
		 * @return json
		 */
		accessToken: function(refresh_token){
			return ClientModel.findOne({"refresh_token": refresh_token}).then( (result) => {
				if (!result) {
					return {
						"code": 404,
						"message": {"msg": "user not found"}
					}
				}
				let client = result.toObject();
				client.access_token = HelperModule.generateToken({"email":client.email, "time": (new Date).getTime()}, true);
				return ClientModel.update({"email": client.email}, {"$set": {"access_token": client.access_token}}, {"upsert":false}).then((updatedResult)=>{
					return {
						"code": 200,
						"message": {access_token: client.access_token}
					};
				});

			}).catch((error)=>{
				throw error;
			});
		}
	}
})();

module.exports = ClientServiceModule