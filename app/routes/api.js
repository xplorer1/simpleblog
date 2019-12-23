const express = require('express');
const app = express();
const apirouter = express.Router();
const User = require("../models/user");
const config = require('../../config');
const mailer = require('../routes/mail');
const jwt = require('jsonwebtoken');

apirouter.use(function(req, res, next) {
    console.log(req.method, req.url);
    next(); 
});

apirouter.post('/signup', Signup);
apirouter.post('/savepost', SavePost);

function Signup(req, res) {
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

			let token = jwt.sign({
                email: req.body.email,
            }, supersecret, {
                expiresIn: 86400 //expires in 24 hours.
            });

			user.save((err, success) => {
				if(err) {
					console.log("err:", err.message);
				}

				if(success) {
					mailer.sendEmailVerificationMail(config.BASE_URL+"/verify/"+vcode, req.body.email);
	                return res.json({status: true, data: "signup-successful", token: token});
				}
			})
		} else if(existinguser) {
			return res.json({status: false, data: "user-exists"});
		}
	})
}

function SavePost(req, res) {
	return res.json({status: true, data: "received"})
}

module.exports = apirouter;