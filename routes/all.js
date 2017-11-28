const express = require('express');
const ClientController = require('../app/Controllers/ClientController');
const ProductController = require('../app/Controllers/ProductController');
const isAuth = require('../app/Middlewares/isAuth');
const isValid = require('../app/Validators');

const Router = express.Router();

Router.post('/login', isValid.login() , function(request, response){
	ClientController.login(request, response);
});

Router.post('/register', function(request, response){
	ClientController.register(request, response);
});

Router.get('/access-token', function(request, response){
	ClientController.accessToken(request, response);
})

Router.get('/product', isAuth, function(request, response){
	ProductController.getAll(request, response);
})

Router.get('/product/:id', isAuth, function(request, response){
	ProductController.get(request, response);
})

Router.post('/product/', isAuth, function(request, response){
	ProductController.create(request, response);
})

Router.put('/product/:id', isAuth, function(request, response){
	ProductController.update(request, response);
})

Router.delete('product/:id', isAuth, function(request, response){
	ProductController.delete(request, response);
})

Router.get('/search/:id', isAuth, function(request, response){
	ProductController.search(request, response);
})

module.exports = Router;
