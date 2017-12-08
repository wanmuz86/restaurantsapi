var express = require('express');
var bodyParser = require('body-parser');
var Restaurant = require('./restaurant.js')
var User = require('./user.js')
var app = express();
var passport = require('passport')

var authController = require('./auth.js');
var mongoose = require('mongoose');

mongoose.connect('mongodb://wanmuz:abcd1234@ds115166.mlab.com:15166/placevisit');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(passport.initialize());
//the default port is 8080 unless u specified it
var port = process.env.PORT || 8080;

//Create the route
var router = express.Router();

router.get('/', function(req, res){
	res.json({message:'hooray! welcome to my first API'});
})



router.route('/restaurants')
.post(authController.isAuthenticated,function(req,res){
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

router.route('/login').post(function(req,res){
	User.findOne({ 'username': req.body.username },function (err, user) {
  if (err) {
  	return res.send(err)
  }
  else{
  	if (req.body.password == user.password){
  		return res.json({message:"ok"})
  	}
  	else {
  		return res.json({message:"password wrong"})
  	}
  }
})

})

router.route('/register').post(function(req,res){
	var user = new User();
	user.username = req.body.username
	user.password = req.body.password

	user.save(function(err){
		if (err){
			res.send(err)
		}
		else {
			res.json({message:"User has been created"})
		}
		
	})

})
app.use('/api',router);

//listen for an event on port specified
app.listen(port);
console.log('Magic happens on port '+port); 