const { check, validationResult } = require('express-validator/check');

let Validators = (function(){
	return {
		login: function() {
			return [
				check('email')
		    .isEmail().withMessage('must be an email')
		    .trim()
		    .normalizeEmail(),
			 
			  check('password', 'passwords must be at least 5 chars long')
			    .isLength({ min: 5 }),
			]
		},

		register: function() {
			return [
				check('email')
		    .isEmail().withMessage('must be an email')
		    .trim()
		    .normalizeEmail()
		    .custom(value => {
		      return findUserByEmail(value).then(user => {
		        throw new Error('this email is already in use');
		      })
		    }),
			 
			  check('password', 'passwords must be at least 5 chars long')
			    .isLength({ min: 5 }),
			]
		},

		product: function() {
			return [
				check('name')
		    .exists(),

		    check('price')
		    .exists(),
			 
			  check('rating')
			  .exists(),
			]
		}
	}
})();

module.exports = Validators