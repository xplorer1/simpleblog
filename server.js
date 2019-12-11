const express = require('express')
const app = express();
const port = 8050;
const api = require("./app/routes/api");
const path = require('path');

let mongoose = require('mongoose'); // for working w/ our database
let config = require('./config');

mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useUnifiedTopology: true, useNewUrlParser: true });

let conn = mongoose.connection;
// conn.on('error', console.error.bind(console, 'connection error:'));
conn.on('error', function(err){
    console.log('mongoose connection error:', err.message);
});

app.use("/api", api);

app.get('*', function(req, res) { 
    res.sendFile(path.join(__dirname + '/build'));
});

app.use(express.static(path.join(__dirname, '/build')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))