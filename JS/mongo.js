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

var exports=module.exports;
exports.authenticateUser = function(l_name,l_password){
	console.log("Authenticating User");
  	mongoobj.db.collection('UserDetails').insert({"name": l_name,"password":l_password},function(err,data){
  		if(err){
  			console.log("Invalid Login");
  		}
  		else{
  			console.log("inserted the user");
  			console.log(data);
  		}
  	});
}