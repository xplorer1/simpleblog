const express = require('express');
const app = express();
const apirouter = express.Router();
const User = require("../models/user");
const config = require('../../config');
const mailer = require('../routes/mail');

apirouter.use(function(req, res, next) {
    console.log(req.method, req.url);
    next(); 
});

apirouter.post('/signup', Signup);

function Signup(req, res) {
	console.log("req.body: ", req.body)
	if(!req.body.email) return res.json({status: false, data: "email-required"});
	if(!req.body.password) return res.json({status: false, data: "password-required"});

	User.findOne({email: req.body.email}, (err, existinguser) => {
		if(err) {
			console.log("err: ", err.message);
			//return res.json({status: false, data: err.message})
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
					//mailer.sendEmailVerificationMail(req.body.fullname.split(" ")[0], BASE_URL+"/verify/"+vcode, req.body.email);
	                return res.json({status: true, data: "signup_successful"});
				}
			})
		} else if(existinguser) {
			return res.json({status: false, data: "user-exists"});
		}
	})
}

module.exports = apirouter;