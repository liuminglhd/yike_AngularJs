angular.module('Contrs',[])
.controller('navCon',['$scope',function($scope){
	$scope.navs = [
		{'link':'#/today','icon':'icon-home','text':'今日一刻'},
		{'link':'#/older','icon':'icon-file-empty','text':'往期内容'},
		{'link':'#/author','icon':'icon-pencil','text':'热门作者'},
		{'link':'#/category','icon':'icon-menu','text':'栏目浏览'},
		{'link':'#/favourite','icon':'icon-heart','text':'我的喜欢'},
		{'link':'#/settings','icon':'icon-cog','text':'设置'}
	];
}])

.controller('todayCon',['$scope','$http','$rootScope',function($scope,$http,$rootScope){
	$rootScope.title = '今日一刻';
	$rootScope.index = 0;
	$rootScope.loaded = false;
	$http({
		url:'./api/today.php',
		method:'get'
	}).then(function(info){
		$rootScope.loaded = true;
		$scope.items = info.data;
	});
}])

.controller('olderCon',['$scope','$http','$rootScope',function($scope,$http,$rootScope){
	$rootScope.title = '往期内容';
	$rootScope.index = 1;
	$rootScope.loaded = false;
	$http({
		url:'./api/older.php'
	}).then(function(info){
		$rootScope.loaded = true;
		$scope.items = info.data;
	});
}])

.controller('authorCon',['$scope','$http','$rootScope',function($scope,$http,$rootScope){
	$rootScope.title = '热门作者';
	$rootScope.index = 2;
	$rootScope.loaded = false;
	$http({
		url:'./api/author.php'
	}).then(function(info){
		$rootScope.loaded = true;
		$scope.items = info.data;
		// 点击作者,跳转到作者的主页的控制器
		$scope.authorCen = function(){
			$rootScope.loaded = false;
			$scope.author = this.author;
			$http({
				url:'./api/center.php',
				method:'get',
				params:{'id':$scope.author.id}
			}).then(function(data){
				$rootScope.loaded = true;
				// console.log(data.data);
				$rootScope.owns = data.data;
			});
		};	
	});	
}])

.controller('categoryCon',['$scope','$http','$rootScope',function($scope,$http,$rootScope){
	$rootScope.title = '栏目浏览';
	$rootScope.index = 3;
	$rootScope.loaded = false;
	$http({
		url:'./api/category.php'
	}).then(function(info){
		$rootScope.loaded = true;
		$scope.items = info.data;
	});
}])

.controller('favouriteCon',['$scope','$http','$rootScope',function($scope,$http,$rootScope){
	$rootScope.title = '我的喜欢';
	$rootScope.index = 4;
	$rootScope.loaded = false;
	$http({
		url:'./api/category.php'
	}).then(function(info){
		$rootScope.loaded = true;
		$scope.items = info.data;
	});
}])

.controller('setCon',['$scope','$http','$rootScope',function($scope,$http,$rootScope){
	$rootScope.title = '设置';
	$rootScope.index = 5;
	$rootScope.loaded = true;
}])
