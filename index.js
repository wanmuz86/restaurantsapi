var express = require('express');
var bodyParser = require('body-parser');
var Restaurant = require('./restaurant.js')
var app = express();

var mongoose = require('mongoose');

mongoose.connect('mongodb://wanmuz:abcd1234@ds115166.mlab.com:15166/placevisit');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//the default port is 8080 unless u specified it
var port = process.env.port || 8080;

//Create the route
var router = express.Router();

router.get('/', function(req, res){
	res.json({message:'hooray! welcome to my first API'});
})



router.route('/restaurants')
.post(function(req,res){
	var restaurant = new Restaurant();
	restaurant.name = req.body.name;
	restaurant.address = req.body.address;
	restaurant.averageRating = 0;
	// var location = {
	// 	latitude: req.body.lat,
	// 	longitude:req.body.long
	// }

	// restaurant.location = location;
	restaurant.save(function(err){
		if (err){
			res.send(err);
		}
		else {
			res.json({message: "Restaurant has been created!"});
		}
	})
})
.get(function(req,res){
	Restaurant.find(function(err,restaurants){
		if (err){
			res.send(err)
		}
		else {
			res.json(restaurants
				);
		}

	})
})


app.use('/api',router);

//listen for an event on port specified
app.listen(port);
console.log('Magic happens on port '+port); 