const express = require('express');
const app = express();
const apirouter = express.Router();
const User = require("../models/user");
const Post = require("../models/post");
const Complaint = require("../models/contact")
const config = require('../../config');
const mailer = require('../routes/mail');
const jwt = require('jsonwebtoken');
const supersecret = config.secret;
const cloudinary = require('cloudinary').v2;

let postholder = "https://www.solidbackgrounds.com/images/2560x1440/2560x1440-davys-grey-solid-color-background.jpg";

cloudinary.config({ 
	cloud_name: 'dlzryf6va', 
	api_key: '778956682317776', 
	api_secret: 'CJAPi-911keO0z2sb3sKHw_7d8E' 
});

apirouter.use(function(req, res, next) {
    console.log(req.method, req.url);
    next(); 
});

apirouter.post('/signup', Signup);
apirouter.post('/savepost', SavePost);
apirouter.post('/login', Login);
apirouter.post('/contactme', ContactMe);
apirouter.get('/allposts', AllPosts);

function Signup(req, res) {
	console.log("req: ", req.body)
	if(!req.body.email) return res.json({status: false, data: "email-required"});
	if(!req.body.password) return res.json({status: false, data: "password-required"});
	if(!req.body.username) return res.json({status: false, data: "name-required"});

	User.findOne({email: req.body.email}, (err, existinguser) => {
		if(err) {
			console.log("err: ", err.message);
			//return res.json({status: false, data: err.message})
		}

		if(!existinguser) {
			let user = new User();

			user.email = req.body.email;
			user.username = req.body.username;
			user.password = req.body.password;
			user.role = "guest";

			let vcode = config.generatePassword();

			user.vcode = vcode;

			let token = jwt.sign({
                email: req.body.email,
            }, supersecret, {
                expiresIn: 86400 // expires in 24 hours.
            });

            let owner = {};

            owner.name = req.body.username;
            owner.token = token;
            owner.role = "guest";

			user.save((err, success) => {
				if(err) {
					console.log("err:", err.message);
				}

				if(success) {
					//mailer.sendEmailVerificationMail(config.BASE_URL+"/verify/"+vcode, req.body.email);
	                return res.json({status: true, data: "signup-successful", user: owner});
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
            			let postid = config.generatePassword();

            			if(req.body.postmedia) {
            				cloudinary.uploader.upload(req.body.postmedia, 
            				{public_id: postid, overwrite: true}, (error, result) => {
            					if(error) {
            						console.log("error: ", error.message);
            						if(error.message === "getaddrinfo ENOTFOUND api.cloudinary.com") {
            							return res.json({status: false, data: "network"})
            						}
            					}

            					if(result) {
            						let post = new Post();

			            			post.owner = decoded.email;
			            			post.ownername = user.username;
			            			post.postid = postid;
			            			post.posttitle = req.body.posttitle;
			            			post.postbody = req.body.postbody;
			            			post.postmedia = result.secure_url || "";

			            			post.save((err, saved) => {
			            				if(err) console.log("err: ", err.message);

			            				if(saved) {
			            					return res.json({status: true, data: "post-saved"})
			            				}
			            			})
            					}
            				});
            			} else {
            				let post = new Post();

	            			post.owner = decoded.email;
	            			post.ownername = user.username;
	            			post.postid = postid;
	            			post.posttitle = req.body.posttitle;
	            			post.postbody = req.body.postbody;
	            			post.postmedia = postholder;

	            			post.save((err, saved) => {
	            				if(err) console.log("err: ", err.message);

	            				if(saved) {
	            					return res.json({status: true, data: "post-saved"})
	            				}
	            			})
            			}
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

        if(!user) {
            return res.json({status: false, data: "user-notfound"});
        }

        else if(!user.comparePassword(req.body.password)) {
            return res.json({status: false, data: "user-notfound"});
        }

        else {
        	let token = jwt.sign({
                email: req.body.email,
            }, supersecret, {
                expiresIn: 86400 // expires in 24 hours.
            });

            let owner = {};

            owner.username = user.username;
            owner.token = token;
            owner.role = "guest";

            return res.json({status: true, data: "login-successful", user: owner})
        }

    })
}

function AllPosts(req, res) {

	Post.find({}, {"__v" : 0, "_id" : 0}, (err, posts) => {
		if(err) console.log("err: ", err.message);

		if(posts) return res.json({status: true, data: posts});

	})
}

function ContactMe(req, res) {
	if(!req.body.contactname) return res.json({status: false, data: "complaintname-required"});
    if(!req.body.contactemail) return res.json({status: false, data: "complaintemail-required"});
    if(!req.body.contactmessage) return res.json({status: false, data: "complaintmessage-required"});

    let complaint = new Complaint();

    complaint.complaintemail = req.body.contactemail;
    complaint.complaintname = req.body.contactname;
    complaint.complaintmessage = req.body.contactmessage;
    complaint.complaintstatus = "Pending";

    complaint.save((err, success) => {

        if(err) {
            console.log("Error saving complaint. ", err.message);
            return res.json({status: false, data: err.message});
        }
        else if(success) {
            //mailer.sendComplaintRecieptMail(req.body.email);

            //mailer.sendComplaintMail(req.body.name, req.body.email, req.body.complaint, corporatemail);

            return res.json({status: true, data: "complaint-saved"});
        }
    });
}

module.exports = apirouter;