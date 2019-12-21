const express = require('express');
const app = express();
const apirouter = express.Router();
const User = require("../models/user");
const config = require('../../config');
const mailer = require('../routes/mail');

apirouter.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);
    next(); 
});

apirouter.get('/api/:d', Index);
apirouter.post('/signup', Signup);

//apirouter.post('/login', Login);
//apirouter.get('/posts', Getposts);
//apirouter.get('/post/:postid', Getpost);
//apirouter.post('/savepost', Savepost);

function Index (req, res) {
	res.send("Yay. got here")
}

function Signup(req, res) {
	if(!req.body.email) return res.json({status: false, data: "email-required"});
	if(!req.body.password) return res.json({status: false, data: "password-required"});

	User.findOne({email: req.body.email}, (err, existinguser) => {
		if(err) {
			console.log("err: ", err.message);
			return res.json({status: false, data: err.message})
		}

		if(!existinguser) {
			let user = new User();

			user.email = req.body.email;
			user.password = req.body.password;
			user.role = "guest";

			user.vcode = config.generatePassword();

			user.save((err, success) => {
				if(err) {
					console.log("err:", err.message);
				}

				if(success) {
					mailer.sendEmailVerificationMail(req.body.fullname.split(" ")[0], BASE_URL+"/verify/"+vcode, req.body.email);
	                return res.json({status: true, data: "signup_successful"});
				}
			})
		} else if(existinguser) {
			return res.json({status: false, data: "user-exists"});
		}
	})
	console.log("Got to Signup. ", req.body);
	return res.json({status: true, data: "recieved." + req.body})
}

module.exports = apirouter;