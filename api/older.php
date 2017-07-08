<?php 
	// 这行代码是检查php文件是否正确
	// phpinfo();
	// 向豆瓣官网发送请求的地址
	// 由于数据是动态获取的,需要获取当前时间
	$old = date('Y-m-d',strtotime('-1 day',time()));
	$url = 'https://moment.douban.com/api/stream/date/'.$old.'?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';
 	// 读取获得数据文件
 	$result = file_get_contents($url);
 	echo $result;
 ?>