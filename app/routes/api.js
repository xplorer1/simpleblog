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

apirouter.get('/api', GeneralController.index);
apirouter.post('/api/signup', GeneralController.signup);
apirouter.post('/api/login', GeneralController.login);
apirouter.get('/api/posts', GeneralController.getposts);
apirouter.get('/api/post/:postid', GeneralController.getpost);
apirouter.post('/api/savepost', GeneralController.savepost);

module.exports = apirouter;