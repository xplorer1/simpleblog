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

apirouter.get('/', GeneralController.index);

module.exports = apirouter;