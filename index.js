//Node Server
var mongo = require('./JS/mongo.js');
var MongoClient = require('mongodb').MongoClient;
var express = require("express");
var app     = express();
app.listen(3000);
var path    = require("path");
app.use(express.static('CSS'));
app.use(express.static('JS'));
app.use(express.static('Assets'));

var bodyParser = require('body-parser');
// create application/json parser 
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
//Variables
var l_name,l_password;

//Routes
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});
// POST /login gets urlencoded bodies 
app.post('/login', urlencodedParser, function (req, res) {
  if (!req.body) 
  	return res.sendStatus(400)
  l_name=req.body.username;
  l_password=req.body.password;
  mongo.authenticateUser(l_name,l_password);
});
console.log("Connected to the server");
// Connect to the db
MongoClient.connect("mongodb://senthilit:rafanadal619@ds123312.mlab.com:23312/football_fantasy", function(err, db) {
  if(err) {
    console.log("We are connected to Mlab");
  }
  else{
  	 console.log(db);
  	db.collection('UserDetails').insertOne({"name":"Lewandowski"},function(err,data){
  		if(err){
  			console.log("asd");
  		}
  		else{
  			console.log("Success");
  		}
  	});
  }
});