var yike = angular.module('yike',['Contrs','ngRoute']);
yike.run(['$rootScope',function($rootScope){
	$rootScope.collapsed = false;
	$rootScope.toggle = function(){
		$rootScope.collapsed = !$rootScope.collapsed;
		var dd = document.querySelectorAll('.navs dd');
		if($rootScope.collapsed){
			for(var i = 0; i < dd.length; i++){
				dd[i].style.transform = 'translate(0)';
				dd[i].style.transitionDuration = 0.2+0.2*i+'s';
				dd[i].style.transitionDelay = '0.2s';
			}
		}else{
			for(var i = dd.length - 1; i >= 0; i--){
				dd[i].style.transform = 'translate(-100%)';
				dd[i].style.transitionDuration = 0.2+0.2*(dd.length - i)+'s';
				dd[i].style.transitionDelay = '';
			}
		}
	}
}])
yike.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/today',{
		templateUrl:'./views/today.html',
		controller:'todayCon'
	})
	.when('/older',{
		templateUrl:'./views/older.html',
		controller:'olderCon'
	})
	.when('/author',{
		templateUrl:'./views/author.html',
		controller:'authorCon'
	})
	.when('/author/center',{
		templateUrl:'./views/center.html',
		controller:'authorCon'
	})
	.when('/category',{
		templateUrl:'./views/category.html',
		controller:'categoryCon'
	})
	.when('/favourite',{
		templateUrl:'./views/favourite.html',
		controller:'favouriteCon'
	})
	.when('/settings',{
		templateUrl:'./views/settings.html',
		controller:'setCon'
	})
	.otherwise({
		redirectTo:'/today'
	})
}]);

