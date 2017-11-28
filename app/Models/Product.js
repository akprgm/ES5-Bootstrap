const mongoose = require('mongoose');
const mongooseDouble = require('mongoose-double');

const {Schema} = mongoose;

const SchemaTypes = mongooseDouble(mongoose);

const productSchema = new Schema({
	name: { type: String, required:[true, 'name field required']},
	price: { type: Number, required:[true, 'price field required']},
	rating: { type: Number, required:[true, 'rating field required']}
}, {
	collection: 'products',
	autoIndex: true,
	tiempstamps: true
});

productSchema.statics.all = function() {
	return this.model('Product').find({});
}

productSchema.statics.search = function(productName) {
	return this.model('Product').find({name: '/.*'+queryString+'.*/'});
}

module.exports = mongoose.model('Product', productSchema);