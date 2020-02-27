var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
    mongoose = require('mongoose'),
    Item = require('./api/models/itemsListModel'), //created model loading here
    User = require('./api/models/usersListModel'),
    bodyParser = require('body-parser');
    cors = require('cors');
    passport = require('passport');
    Strategy = require('passport-http').BasicStrategy;
    bcrypt = require('bcryptjs');

const saltRounds = 4;

app.use(cors());
app.use(bodyParser.json());


// mongoose instance connection url connection
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/ShoppingApp'); 

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    
    var routes = require('./api/routes/itemsListRoute'); //importing route
    routes(app); //register the route

    var routes = require('./api/routes/usersListRoute'); //importing route
    routes(app); //register the route

// Middlewares
    app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
    });

// Register a new user
// Needs following arguments: fullname, username, password
// Returns response with status 201 for OK or status 500 for ERROR (with error message)
app.post('/api/users/register', (req, res) => {
    console.log('[INFO] server.js post(/api/users/register) fullname:"' + req.body.fullname + '" username:"' + req.body.username + '" password:"' + req.body.password +'"');
  
    // First check if username already exists in database
    db.collection('users').find({ username: req.body.username }).toArray().then(arr => {
      if(arr.length != 0) {
        // Results found for given username, send error response
        console.log('[INFO] erver.js post(/api/users/register) username:"' + req.body.username + '" already exists, sending error response(500, Username already exists)');
        res.status(500).send('Username already exists');
      } else {
        // Hash password and insert new user to database
        bcrypt.hash(req.body.password, saltRounds).then(hash => {
          console.log('[INFO] server.js post(/api/users/register) db insertOne(fullname:"' + req.body.fullname + '" username:"' + req.body.username + '" password:"' + hash +'")');
          db.collection('users').insertOne({ fullname: req.body.fullname, username: req.body.username, password: hash }).then(arr => {
            res.sendStatus(201);
          }).catch(error =>  {
            console.log('[ERROR] server.js post(/api/users/register) db insertOne() failed: ' + error);
            res.sendStatus(500)
          })
        }).catch(error =>  {
          console.log('[ERROR] server.js post(/api/users/register) bcrypt.hash failed: ' + error);
          res.sendStatus(500)
        })
      }
    }).catch(error => {
      console.log('[ERROR] server.js post(/api/users/register) db find() failed: ' + error);
      return res.sendStatus(500);
    });
  });
   
  
  // Used for checking user authentication
  passport.use(new Strategy((username, password, cb) => {
    console.log('[INFO] server.js passport.use() username:"' + username + '" password:"' + password + '"');
    // Check if username exists in database
    db.collection('users').find({ username: username }).toArray().then(arr => {
      if(arr.length == 1) {
        // Found given username, check if password from database matches with given password
        bcrypt.compare(password, arr[0].password).then(bcryptResult => {
          if(bcryptResult == true) {
             console.log('[INFO] server.js passport.use() authentication succesful');
            cb(null, { id: arr[0]._id, username: arr[0].username, fullname: arr[0].fullname });
          } else {
             console.log('[INFO] server.js passport.use() authentication failed');
            return cb(null, false);
          }
        })
      } else {
        // Username not found from database
        console.log('[INFO] server.js passport.use() username:"' + username + '" not found from db');
        return cb(null, false);
      }
    }).catch(error => {
      console.log('[ERROR] server.js passport.use() db find() failed: ' + error);
      return cb(null, false);
    });
  }));
  
  
  // Checks user login and authentication
  // Needs following arguments: username
  // Returns users full name in argument fullname if authetication is succesful
  app.get('/api/users/login',
    passport.authenticate('basic', { session: false }),
    (req, res) => {
      // Send back user fullname
      res.json( { fullname: req.user.fullname } );
  });


app.listen(port);

console.log('items/users list RESTful API server started on: ' + port);