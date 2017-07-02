var app=angular.module('app',[]);

app.controller('Login-Controller',function($scope,$rootScope){
  $scope.kickoffLogin=true;
  $scope.kickoffSignup=null;
  $scope.Signup=function(){
    if ($scope.kickoffLogin===true){
      $scope.kickoffLogin=false;
      $scope.kickoffSignup=true;
      console.log(1);
    }else {
      $scope.kickoffLogin=true;
      $scope.kickoffSignup=false;
      console.log(2);
    }
  }

  $scope.validate=function(user){
    console.log(user);
  }
});
