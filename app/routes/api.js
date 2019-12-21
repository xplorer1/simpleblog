const express = require('express');
const app = express();
const apirouter = express.Router();

const GeneralController = require("../controllers/generalcontroller");

apirouter.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next(); 
});

apirouter.get('/api/:d', Index);
apirouter.post('/signup', Signup);
//apirouter.post('/login', Login);
//apirouter.get('/posts', Getposts);
//apirouter.get('/post/:postid', Getpost);
//apirouter.post('/savepost', Savepost);

function Index (req, res) {
	console.log("got to Index.");
	res.send("Yay. got here")
}

function Signup(req, res) {
	console.log("Got to Signup. ", req.body);
	return res.json({status: true, data: "recieved." + req.body})
}

module.exports = apirouter;