var app=angular.module('app',[]);

app.controller('Login-Controller',function($scope,$rootScope){
  $scope.kickoffLogin=true;
  $scope.kickoffSignup=null;
  $scope.strength=null;
  $scope.flag1=false;
  $scope.flag2=false;

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
  }

  //Function to validate the strength and pattern of the password entered by the user while signing up 
  $scope.passwordStrengthValidation= function(password){
    console.log(password);
    var patt1 = /\d/; //pattern to match the digit 
    var patt2 = /\D/; //pattern to match the non-digit
    var patt3 = /^([A-Z][a-z0-9]{1,})$/; //pattern to check capital letter at first and alphanumeric for rest
    var result3 = patt3.test(password); // variables with boolean 
    var result1 = patt1.test(password); //values for comparison
    var result2 = patt2.test(password);
    if (password!=undefined && password!=''){
        if (result1!=false && $scope.flag1==false){
          console.log('inside result1');
          $scope.strength+=33;
          $scope.flag1=true;
        }
        if(result1==false && $scope.flag1==true){
          console.log('inside result1 strength');
          $scope.strength-=33;
        }
        if (result2!=false && $scope.flag2==false){
          console.log('inside result2');
          $scope.strength+=33;
          $scope.flag2=true;
        }
        if(result2==false && $scope.flag2==true){
          console.log('inside result2 strength');
          $scope.strength-=33;
        }
        if(password.match(patt1)==null){
          $scope.flag1=false;
        }
        if(password.match(patt2)==null){
          $scope.flag2=false;
        }
        if(password.length>=8 && $scope.strength<100 ){
          if(result3==true){
            $scope.strength+=34;
          }
        }
        console.log($scope.strength);
    }else{
      $scope.strength=0;
      result1=false;
      result2=false;
      $scope.flag1=false;
      $scope.flag2=false;
    }
    
     
  }
});

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
});