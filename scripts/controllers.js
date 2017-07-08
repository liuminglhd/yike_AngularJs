// 控制器模块
// 在项目中,最好一块内容写一个js文件
// 由于每块视图的内容都是通过控制器操作,到模型层获取的,所以要写很多视图
// 而这样主页面就会需要添加很多控制器,层次结构会很不清晰
// 这样写,应用主模块依赖控制器模块,结构也清晰
angular.module('Contrs',[])
// 这样写便于查看控制器数量
.controller('navCon',['$scope',function($scope){
	// 左侧导航栏数据从模型层获取
	// 数据包括:href链接的视图、小图标(class属性)、目录文字
	// 点击的属性会有颜色变化,即active属性也要设置
	// html页面遍历数据ng-repeat
	$scope.navs = [
		{'link':'#/today','icon':'icon-home','text':'今日一刻'},
		{'link':'#/older','icon':'icon-file-empty','text':'往期内容'},
		{'link':'#/author','icon':'icon-pencil','text':'热门作者'},
		{'link':'#/category','icon':'icon-menu','text':'栏目浏览'},
		{'link':'#/favourite','icon':'icon-heart','text':'我的喜欢'},
		{'link':'#/settings','icon':'icon-cog','text':'设置'}
	];
}])
// ----------------------------------------------------------------------------
// 左侧导航栏点击,右侧主体切换对应的内容,也就是展示对应的视图
// 这也就是说需要ng-view展示视图,也就是需要通过路由锚点判断
// 点击"今日一刻",填充响应的视图页面
.controller('todayCon',['$scope','$http','$rootScope',function($scope,$http,$rootScope){
	$rootScope.title = '今日一刻';
	$rootScope.index = 0;
	$rootScope.loaded = false;
	// 控制器处理数据,因为在today.html页面中,数据也是通过请求获取的
	// 这时候就需要通过$http发送请求,获取数据
	$http({
		// 由于数据求是到豆瓣服务器获取的,会发生跨域问题,但是又需要请求数据
		// 解决方案:发送请求到后台,由后台向豆瓣服务器请求数据,并处理返回所需要的数据
		// controller.js文件是引入到index.html页面,路径从index.html出发
		url:'./api/today.php',
		method:'get'
	}).then(function(info){
		$rootScope.loaded = true;
		// success方法被淘汰了,then方法是再一次封装了success
		// then方法传的数据是以一个对象形式,包含数据、状态码等,更符合后台返回的数据格式
		// congsole.log是为了打印出该数据,查找到需要的数据信息,在属性data里
		$scope.items = info.data;
		// 接下来就去today.html视图层读取数据
	});
}])
// 往期内容与今日一刻的操作一样
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
// 热门作者的控制器
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
// 栏目浏览的控制器
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
// 我的喜欢的控制器
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
// 设置的控制器
.controller('setCon',['$scope','$http','$rootScope',function($scope,$http,$rootScope){
	$rootScope.title = '设置';
	$rootScope.index = 5;
	$rootScope.loaded = true;
}])