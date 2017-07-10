var MongoClient = require('mongodb').MongoClient;
// Connect to the db
MongoClient.connect("mongodb://senthilit:rafanadal619@ds123312.mlab.com:23312/football_fantasy", function(err, db) {
  if(err) {
    console.log("Unable to connect to the Database");
  }
  else{
  	 console.log("Mongo connected");
  	 mongoobj={db:db};
  }
});

//Login User 
var exports=module.exports;
exports.authenticateUser = function(l_name,l_password,callback){
	console.log("Authenticating User");
  	mongoobj.db.collection('UserDetails').find({"name": l_name,"password":l_password}).toArray(function(err,data){
  		if(err){
  			console.log("Error logging in. Try Again");
  		}
  		else 
        callback("asd");
  	});
}
//Signup User -Add new User
exports.signupUser = function(s_name,s_password,s_email,s_dob){
  console.log("Adding new User");
    mongoobj.db.collection('UserDetails').insert({"name": s_name,"password":s_password,"email":s_email,"dob":s_dob},function(err,data){
      if(err){
        console.log("Error signing up. Try Again");
      }
      else{
        console.log("Successfully Signed Up");
        console.log(data);
      }
    });
}

//Check Availability of the User
exports.checkUsername = function(uname,callback){
  result=null;
  console.log("Checking Username Availability:"+uname);
    mongoobj.db.collection('UserDetails').find({'name': uname}).toArray(function(err,data){
      if(err){
        console.log("Try Again");
        console.log(err);
      }
      else{
        console.log("Username Available. Try Another Name");
        if(data!=''){
        console.log("Data:"+data);
          callback(data);
        }
        else
          callback(data);
      }
    });
}