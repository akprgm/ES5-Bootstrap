/**
 * Controler
 */

let Controller = function (){}

Controller.prototype =  {
	validateRequest : function(request, response){
		let errors = request.validationErrors();
		if (errors) {
			response.status(422).json({
				param: errors[0].param,
				msg: errors[0].msg
			});
		}
	}
};

module.exports = Controller;