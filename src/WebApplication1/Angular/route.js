angular.module('routes',['ngRoute'])
.config(['$routeProvider','$locationProvider','$httpProvider','$interpolateProvider',function($routeProvider,$locationProvider,$httpProvider,$interpolateProvider){
	$httpProvider.interceptors.push('httpRequestInterceptor');	
	$routeProvider
		.when('/',{templateUrl:'/Angular/views/location/index.html',
					controller:'locationController'})
		.when('/login',{templateUrl:'/Angular/views/account/login.html',
					controller:'accountController'})					
		.when('/error',{templateUrl:'/Angular/views/error/index.html',
					controller:'errorController'})
        .when('/about',{templateUrl:'/Angular/views/about/index.html',
					controller:'aboutController'})
		.when('/home', { redirectTo: '/' })
		.otherwise({redirectTo:'/error'})
	$locationProvider.html5Mode({enabled:true,requireBase:false});
}]);