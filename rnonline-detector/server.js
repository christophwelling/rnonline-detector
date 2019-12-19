 // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var mongodb = require('mongodb');
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================
    var url = "mongodb+srv://detector_write:detector_write@cluster0-fc0my.mongodb.net/test?retryWrites=true&w=majority";
    var client = mongodb.MongoClient(url);

    app.use(express.static(__dirname + '/app'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // API functions ==================================================

    app.get('/api/getAmpBoards', function(req, res) {
      console.log('inside api function')
      client.connect(function(err, db) {
        db.db('detector').collection('amp_boards').find({}, function(err,cursor){
          cursor.toArray(function(err, cursorArray) {
            res.json(cursorArray)
          })
        });
      });
    })


    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");
