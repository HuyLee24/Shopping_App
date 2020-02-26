var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
    mongoose = require('mongoose'),
    Item = require('./api/models/itemsListModel'), //created model loading here
    bodyParser = require('body-parser');

// mongoose instance connection url connection
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/ShoppingApp'); 

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    
    
    var routes = require('./api/routes/itemsListRoute'); //importing route
    routes(app); //register the route

// Middlewares
    app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
    });

app.listen(port);

console.log('items list RESTful API server started on: ' + port);