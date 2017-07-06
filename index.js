//Node Server
var mongo = require('./JS/mongo.js');
var MongoClient = require('mongodb').MongoClient;
var express = require("express");
var app     = express();
app.listen(4000);
var path    = require("path");
app.use(express.static('CSS'));
app.use(express.static('JS'));
app.use(express.static('Assets'));

var bodyParser = require('body-parser');
// create application/json parser 
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
//Routes
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});
// POST /login 
app.post('/login', urlencodedParser, function (req, res) {
  if (!req.body) 
  	return res.sendStatus(400)
  l_name=req.body.username;
  l_password=req.body.password;
  mongo.authenticateUser(l_name,l_password);
});

//POST Signup User
app.post('/signup', urlencodedParser, function (req, res) {
  if (!req.body) 
    return res.sendStatus(400)
  s_name = req.body.username;
  s_password = req.body.password;
  s_email = req.body.email;
  s_dob = req.body.dob;
  mongo.signupUser(s_name,s_password,s_email,s_dob);
  return res.redirect('/');
});

app.get('/checkavailability',function(req,res){
  var name=req.query.name;
  mongo.checkUsername(name,function(data,err){
    console.log("Result:"+data+"Err:"+err);
    res.json(data);
  });
})
console.log("Connected to the server");
