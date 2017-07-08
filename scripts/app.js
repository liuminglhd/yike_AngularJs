// 作为整个页面的应用模块
// 页面控制器存放在一个js文件中,需要与应用主模块之间有一个依赖关系
// 这里要依赖注入控制器模块
// 根据路由锚点值判断数据,要依赖路由模块ngRoute
var yike = angular.module('yike',['Contrs','ngRoute']);
// 模块一旦创建成功就立刻执行(run:运行)
yike.run(['$rootScope',function($rootScope){
	// 点击头部的菜单,可以滑出导航栏,头部和主体都相应右移
	// 由于这个效果在不同视图下都有,在控制器下写实现效果则需要每个视图都绑定一个控制器
	// 所以将同一个效果绑定到应用这个大模块,那么在一个html页面下,整个应用都可以使用该效果
	$rootScope.collapsed = false;
	// 即绑定方法到$rootScope上	
	$rootScope.toggle = function(){
		// 这里移动是通过css样式写好的collapse属性操作的,也就是说通过增删该属性达到移动效果
		// angular的class属性: ng-class="{属性名:true|false}"
		// collapsed判断点击的时候滑动,即为true|false
		$rootScope.collapsed = !$rootScope.collapsed;
		// 设置后发现左侧导航栏目录并没有移动,查找相关css样式或js动画
		// 找出样式transform:translate(-100%)导致没有移动,所以设置位移效果
		// 位移效果是在dd元素节点上,所以要获取该节点
		var dd = document.querySelectorAll('.navs dd');
		if($rootScope.collapsed){
			// dd元素节点是一组对象,需要遍历修改样式
			for(var i = 0; i < dd.length; i++){
				dd[i].style.transform = 'translate(0)';
				// 发现没有动态效果,还要添加过渡效果样式transition
				// 效果:从上往下依次右滑,所以过渡时间从上往下变长
				dd[i].style.transitionDuration = 0.2+0.2*i+'s';
				// 为了效果更好,可以添加延迟时间
				dd[i].style.transitionDelay = '0.2s';
			}
		}else{
			// 这里换成i--是为了更好的显示效果
			for(var i = dd.length - 1; i >= 0; i--){
				// 左移也有相应效果
				// 过渡效果是要有某些变化才可用,这里是发生位移变化
				// 效果:从下往上依次左滑,所以过渡时间从下往上变长
				dd[i].style.transform = 'translate(-100%)';
				dd[i].style.transitionDuration = 0.2+0.2*(dd.length - i)+'s';
				// 这里如果不设置,则会用上面设置的延迟时间,动画效果不好？？？
				dd[i].style.transitionDelay = '';
			}
		}
	}
}])
// 右侧主体展示的视图数据是通过路由锚点判断得到的对应内容
// 而路由是应用在整个应用模块上的,所以要在app.js文件下配置路由
yike.config(['$routeProvider',function($routeProvider){
	// 通过when...otherwise判断锚点值
	$routeProvider.when('/today',{
		// 这里路径:由于app.js文件是引入index.html里面使用的,路径应该从index.html出发
		templateUrl:'./views/today.html',
		// 绑定对应的控制器,因为要处理数据
		controller:'todayCon'
	})
	// 往期内容的操作跟今日一刻的一模一样,除了时间的获取有一点区别
	.when('/older',{
		templateUrl:'./views/older.html',
		controller:'olderCon'
	})
	// 本周推荐和热门作者
	.when('/author',{
		templateUrl:'./views/author.html',
		controller:'authorCon'
	})
	// 本周推荐和热门作者,点击作者,切换到作者主页
	.when('/author/center',{
		templateUrl:'./views/center.html',
		controller:'authorCon'
	})
	// 栏目浏览
	.when('/category',{
		templateUrl:'./views/category.html',
		controller:'categoryCon'
	})
	// 我的喜欢
	.when('/favourite',{
		templateUrl:'./views/favourite.html',
		controller:'favouriteCon'
	})
	// 设置
	.when('/settings',{
		templateUrl:'./views/settings.html',
		controller:'setCon'
	})
	// 直接进入主页的时候,需要显示内容,而这个内容就是today.html的内容
	// 这时候可以通过otherwise方法重定向到锚点值today的情况
	.otherwise({
		redirectTo:'/today'
	})
}]);

