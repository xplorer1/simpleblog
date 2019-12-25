const express = require('express');
const app = express();
const apirouter = express.Router();
const User = require("../models/user");
const Post = require("../models/post");
const config = require('../../config');
const mailer = require('../routes/mail');
const jwt = require('jsonwebtoken');
const supersecret = config.secret;

apirouter.use(function(req, res, next) {
    console.log(req.method, req.url);
    next(); 
});

apirouter.post('/signup', Signup);
apirouter.post('/savepost', SavePost);
apirouter.post('/login', Login);

function Signup(req, res) {
	if(!req.body.email) return res.json({status: false, data: "email-required"});
	if(!req.body.password) return res.json({status: false, data: "password-required"});
	if(!req.body.name) return res.json({status: false, data: "name-required"});

	User.findOne({email: req.body.email}, (err, existinguser) => {
		if(err) {
			console.log("err: ", err.message);
			//return res.json({status: false, data: err.message})
		}

		if(!existinguser) {
			let user = new User();

			user.email = req.body.email;
			user.name = req.body.name;
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
	if(!req.body.token) return res.json({status: false, data: "token-required"});
	if(!req.body.posttitle) return res.json({status: false, data: "posttitle-required"});
	if(!req.body.postbody) return res.json({status: false, data: "postbody-required"});

	jwt.verify(req.body.token, supersecret, function (err, decoded) {

            if (err) {
                console.log("err: ", err.message);
                return res.json({status: false, data: "token_expired"})
            }
            else if(decoded) {
            	User.findOne({email: decoded.email}, (err, user) => {
            		if(err) console.log("err: ", err.message);

            		if(!user) return res.json({status: false, data: "user-notfound"});

            		if(user) {
            			let post = new Post();

            			post.owner = decoded.email;
            			post.postid = config.generatePassword();
            			post.posttitle = req.body.posttitle;
            			post.postbody = req.body.postbody;
            			post.postmedia = req.body.postmedia || "";

            			post.save((err, saved) => {
            				if(err) console.log("err: ", err.message);

            				if(saved) {
            					return res.json({status: true, data: "post-saved"})
            				}
            			})
            		}
            	})
            } else {
            	console.log("Unknown error.")
            	return res.json({status: false, data: "unknown-error"});
            }
    });
}

function Login(req, res) {
	if(!req.body.email) return res.json({status: false, data: "email-required"});
    if(!req.body.password) return res.json({status: false, data: "password-required"});

    User.findOne({email: req.body.email}, (err, user) => {
        if(err) return res.json({status: false, data: err.message});

        let validpassword = user.comparePassword(req.body.password);

        if(!user && !validpassword) {
            return res.json({status: false, data: "user-notfound"});
        }
        else {
        	let token = jwt.sign({
                email: req.body.email,
            }, supersecret, {
                expiresIn: 86400 // expires in 24 hours.
            });

            let owner = {};

            owner.name = user.name;
            owner.token = token;
            owner.role = "guest";

            return res.json({status: true, data: "login-successful", user: owner})
        }

    })
}

module.exports = apirouter;