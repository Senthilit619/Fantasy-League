var app=angular.module('app',[]);

app.controller('Login-Controller',function($scope,$rootScope,$http){
  $scope.kickoffLogin=true;
  $scope.kickoffSignup=null;
  $scope.strength=null;
  $scope.flag1=false;
  $scope.flag2=false;
  $scope.confirm_message=null;
  $scope.validate_message=null;
  $scope.availability_message=null;
  $rootScope.availability=null;
  $rootScope.not_availability=null;
  $rootScope.loading=null;

  $scope.display = function(name){
    console.log(name);
  }
  $scope.checkAvailability = function(name,form){
    console.log("Checking availability");
    $rootScope.loading=true;
    $http.get("checkavailability", {params:{"name": name}}).then(function(response){
          $rootScope.loading=false;
          console.log(form.username.$dirty);
          if(name == undefined)
          {
            $rootScope.availability = false;
            $rootScope.not_availability = false;
          }

          if(response.data.length == 0 && name != undefined && form.username.$dirty==true){
              $scope.availability_message="Username Available";
              $rootScope.availability=true;
              $rootScope.not_availability=false;
          }
          else if(response.data.length != 0 && name != undefined && form.username.$dirty==true){
            $scope.availability_message="Sorry! Username already taken";
            $rootScope.availability=false;
            $rootScope.not_availability=true;
          }
          console.log($rootScope.availability);
      },function(err){
          console.log(err);
        });
  }

  $scope.Signup=function(form){
    if ($scope.kickoffLogin===true){
      $scope.kickoffLogin=false;
      $scope.kickoffSignup=true;
      angular.element(document.body).append(form);
    }else {
      $scope.kickoffLogin=true;
      $scope.kickoffSignup=false;
    }
  }

  $scope.passwordValidation = function(pwrd){
    var patt1 = /\d/; //pattern to match the digit 
    var patt2 = /\D/; //pattern to match the non-digit
    var split_pwrd = pwrd.slice(1,pwrd.length);
    var result1 = patt1.test(split_pwrd); //values for comparison
    var result2 = patt2.test(split_pwrd);
    if(pwrd[0]!=pwrd[0].toUpperCase())
        $scope.validate_message="First letter must be Capital letter";
    else{
        $scope.validate_message=false;
      if(result2==false)
        $scope.validate_message="Password must contain lowercase alphabets";
      else{
        $scope.validate_message=false;
        if(result1==false)
            $scope.validate_message="Password must contain numbers";
        else{
          $scope.validate_message=false;
          if(pwrd.length<8)
            $scope.validate_message="Password must be atleast 8 characters long";
          else
              $scope.validate_message=false;
        }
      }
    }
  }

 $scope.passwordConfirmation=function(pwrd,con_pwrd,form){
    if(pwrd!=con_pwrd)
      $scope.confirm_message=true;
    else{
      $scope.confirm_message=false;
    }
  }
  $scope.validateForm = function(form){
    if($scope.confirm_message==true && $scope.validate_message==false)
        form.$setValidity('form',false);
    else
      form.$setValidity('form',true);
  }

  //Function to validate the strength and pattern of the password entered by the user while signing up 
  $scope.passwordStrengthValidation= function(password){
    var patt1 = /\d/; //pattern to match the digit 
    var patt2 = /\D/; //pattern to match the non-digit
    var patt3 = /^([A-Z][a-z0-9]{1,})$/; //pattern to check capital letter at first and alphanumeric for rest
    var result3 = patt3.test(password); // variables with boolean 
    var result1 = patt1.test(password); //values for comparison
    var result2 = patt2.test(password);
    if (password!=undefined && password!=''){
        if (result1!=false && $scope.flag1==false){
          $scope.strength+=33;
          $scope.flag1=true;
        }
        if(result1==false && $scope.flag1==true){
          $scope.strength-=33;
        }
        if (result2!=false && $scope.flag2==false){
          $scope.strength+=33;
          $scope.flag2=true;
        }
        if(result2==false && $scope.flag2==true){
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
      }
      else{
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