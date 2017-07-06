$(document).ready(function(){
  $('.location-btn').click(function(){
      $('#location-canvas').toggleClass('display-location');
	  if($('.location-btn').hasClass('glyphicon-chevron-right')){
		  $('.location-btn').addClass('glyphicon-chevron-left');
		  $('.location-btn').removeClass('glyphicon-chevron-right');
	  }
	  else if($('.location-btn').hasClass('glyphicon-chevron-left')){
		  $('.location-btn').addClass('glyphicon-chevron-right');
		  $('.location-btn').removeClass('glyphicon-chevron-left');
	  }
  });
  $('.user-menu-btn').click(function(){
      $('#user-menu-canvas').toggleClass('display-usermenu');
	  if($('.user-menu-btn').hasClass('glyphicon-chevron-right')){
		  $('.user-menu-btn').addClass('glyphicon-chevron-left');
		  $('.user-menu-btn').removeClass('glyphicon-chevron-right');
	  }
	  else if($('.user-menu-btn').hasClass('glyphicon-chevron-left')){
		  $('.user-menu-btn').addClass('glyphicon-chevron-right');
		  $('.user-menu-btn').removeClass('glyphicon-chevron-left');
	  }
  });
});

function opendoor(){
	$(document).ready(function(){
		$("#left-door").css('transform','translateX(-100%)');
		$("#right-door").css('transform','translateX(100%)');
	});
}
earth='asagsga';
function initialize() {
		var options = {atmosphere: true, center: [0, 0], zoom: 1.5};
        earth = new WE.map('earth_div',options);
        WE.tileLayer('http://data.webglearth.com/natural-earth-color/{z}/{x}/{y}.jpg', {
          tileSize: 256,
          bounds: [[-85, -180], [85, 180]],
          minZoom: 0,
          maxZoom: 16,
          attribution: 'WebGLEarth example',
          tms: true
        }).addTo(earth);
}

var temp='haua';

var home = angular.module('home',[]);
home.controller('homeCtrl',function($scope,$rootScope){
	$rootScope.locations=[{url:'Assets/Images/england.jpg',country:"England",lat:54.100933,lon:-1.699097},
						  {url:'Assets/Images/spain.jpg',country:'Spain',lat:40.403177,lon:-4.098099},
						  {url:'Assets/Images/germany.jpg',country:'Germany',lat:50.869342,lon:10.184663},
						  {url:'Assets/Images/france.jpg',country:'France',lat:46.849884,lon:2.411787},
						  {url:'Assets/Images/italy.jpg',country:'Italy',lat:42.272805,lon:13.055542}];
	$scope.transformMap = function(countryName){
		for (var i=0;i<$rootScope.locations.length;i++){
			if($rootScope.locations[i].country==countryName){
				earth.setView([$rootScope.locations[i].lat, $rootScope.locations[i].lon], 4.8);
			}
		}
		
	}



});