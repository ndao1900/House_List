var http = require('http');
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var body_parser = require('body-parser');
var cors = require('cors');

var MONGO_URL = "mongodb://127.0.0.1:27017/";


var originsWhitelist = [
    'http://localhost:4200',
    'localhost:4200/*'
];
var corsOptions = {
    origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials:true
}
var app = express();
app.use(body_parser.urlencoded({extended:true}))
app.use(body_parser.json());
app.use(cors(corsOptions));
var port = 8080;
require('./routes/item.routes.js')(app);
require('./routes/container.routes.js')(app);
app.listen(port, ()=>{console.log('Server started on port '+port.toString())})

mongoose.connect(MONGO_URL,)