// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();    
    var jwt = require('express-jwt');// create our app w/ express
    var sql      = require('mssql');                 // mongoose for mongodb
    var morgan = require('morgan');                  // log requests to the console (express4)
    var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var uuid = require('uuid');                      // generete new uid

    //KEY CHECK========================

    var jwtCheck = jwt({
      secret: new Buffer('AXtdkQbVuvqGQQPyQ06Ks9KyNG-0qoq3Vo7u42PIieyJ1cZnlJIUJd2qwWNnvHpF', 'base64'),
      audience: 'oFP2Wct8YTQvmWjmKAk4YgGmfLVZwJsl'
    });

    app.use('/api/home', jwtCheck);

//SQL SERVER DEFINITION
    
    var sql = require('mssql');
        var config = {
                    user: 'sa',
                    password: 'n1g22s581,',
                    server: 'R2D2\\NYS', // You can use 'localhost\\instance' to connect to named instance 
                    database: 'myday',
                    options: {
                        encrypt: false // Use this if you're on Windows Azure 
                    }
                }
        console.log('sql povezan');

        var db = new sql.Connection(config, function(err) {console.log('sql_active')});
        var request = new sql.Request(db);
        console.log('sql_config');
    // configuration =================

   // mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");




// routes ======================================================================

// app.get('*', function(req, res) {
//
//          res.sendfile('PUBLIC/index.html'); // load the single view file (angular will handle the page changes on the front-end)
//          console.log('poslao sam stranu');
// });

     // api ---------------------------------------------------------------------
     // get all todos
    app.get('/api/users', function(req,res) {  
        req.body.users;   
        request.query("SELECT  id_user,uname,ulastname  FROM myd_users", function(err, recordset){
            if(err){console.log(err)};
            res.json(recordset);
            console.log(recordset);
        });

    app.get('/register', function(req,res) {  
        res.sendfile('PUBLIC/html/register.htm');
            console.log("register");
        });
    app.get('/login', function(req,res) {  
        res.sendfile('PUBLIC/html/login.tpl.html');
            console.log("login");
        });
        
     });


    // create todo and send back all todos after creation
    app.post('/api/users', function(req,res) {
        var qinsert_users= "INSERT INTO myd_users (id_user, uname, ulastname, uaddress) VALUES ( @uid, @uname, @ulastname, @uaddress)";
        console.log(req.body.lastname+","+req.body.name);
        
        request.input("uid", sql.UniqueIdentifier,uuid.v4());
        request.input('uname', sql.VarChar(10),req.body.name);
        request.input('ulastname', sql.VarChar(10), req.body.lastname);
        // request.input('ucompany', sql.UniqueIdentifier, uuid.v4());
        request.input('uaddress', sql.VarChar(10), req.body.address);
       

        request.query(qinsert_users,
                       function(err){
                           if(err){
                                console.log('greska'+err);
                            };
                        });
            // get and return all the todos after you create another
        request.query("SELECT  id_user,uname,ulastname  FROM myd_users", function(err, recordset){
            if(err){console.log(err)};
                res.json(recordset);
                console.log(req.body.address+req.body.name);
            });
        });

    // delete a user
    app.delete('/api/users/:user_id', function(req, res) {

       // request.input('user_id', sql.UniqueIdentifier,req.param.user_id);
        var qdelete_users= "DELETE FROM myd_users where id_user like"+"'"+req.params.user_id+"'";
        request.query(qdelete_users, function(err) {
            if (err) 
                res.send(err);

            // get and return all the todos after you create another
           request.query("SELECT  id_user,uname,ulastname  FROM myd_users", function(err, recordset){
            if(err){console.log(err)};
                res.json(recordset);
                console.log("obrisao");
            });
        });
    });