var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
rating: Number,
username: String,
createdAt : {type:Date, default:Date.now},
reviewText: String
})

var OpeningSchema = new Schema({
day : String,
hours: String,
opened: Boolean
})
var geolocSchema = new Schema({
	latitude:Number,
	longitude:Number
})

var RestaurantSchema = new Schema({
	name: String,
	address: String,  
	facilities: [String],
	//location: geolocSchema,
     reviews: [ReviewSchema],
     opening: [OpeningSchema],
     averageRating: Number
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);