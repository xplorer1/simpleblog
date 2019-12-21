const express = require('express')
const app = express();
const port = 8050;
const api = require("./app/routes/api");
const path = require('path');
const bodyParser = require('body-parser');

let mongoose = require('mongoose'); // for working w/ our database
let config = require('./config');

mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useUnifiedTopology: true, useNewUrlParser: true });

let conn = mongoose.connection;
// conn.on('error', console.error.bind(console, 'connection error:'));
conn.on('error', function(err){
    console.log('mongoose connection error:', err.message);
});

//app.use(bodyParser.urlencoded({ extended: true }));

/*app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.raw({limit: '5mb'}) );*/

app.use(express.json())

// configure our app to handle CORS requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'x-access-token,X-Requested-With,Content-Type,Authorization');
    res.setHeader('X-Powered-By', 'Lucky Lucciano');
    next();
});

app.use("/api", api);
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function(req, res) { 
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
    //res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(port, () => console.log(`Blog listening on port ${port}!`))