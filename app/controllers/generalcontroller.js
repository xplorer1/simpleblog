let User = require("../models/user");
let config = require('./config');

//return the index page.
exports.index = (req, res) => {
	//this is supposed to do something about home page.
}

exports.signup = (req, res) => {
	console.log("this is signup.", req.body)

	if(!req.body.email) return res.json({status: false, data: "email_required"});
    if(!req.body.password) return res.json({status: false, data: "password_required"});

    User.findOne({email: req.body.email}, (err, found) => {
    	if(err) {
    		console.log("err: ", err.message);
    	}

    	if(found) {
    		res.json({status: false, data: "exists"});
    	}

    	if(!found) {
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
    	}
    })
}

exports.login = (req, res) => {
	console.log("this is login.")
}

exports.getpost = (req, res) => {
	console.log("this is getpost.")
}

exports.getposts = (req, res) => {
	console.log("this is getposts.")
}

exports.savepost = (req, res) => {
	console.log("this is savepost.")
}