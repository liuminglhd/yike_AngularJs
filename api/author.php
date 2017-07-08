<?php 
	header('Content-type:text/html;charset=utf-8');
	// 本周推荐
 	$urlRec = 'https://moment.douban.com/api/auth_authors/rec?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';
 	// 热门作者
 	$urlAll = 'https://moment.douban.com/api/auth_authors/all?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';
 	// 读取获得数据文件
 	$resRec = file_get_contents($urlRec);
 	$resAll = file_get_contents($urlAll);
 	// json数据转换为php对象
 	$phpRec = json_decode($resRec);
 	$phpAll = json_decode($resAll);
 	$newArr = array(
 		"rec" => $phpRec,
 		"all" => $phpAll
 	);
 	// $newArr = array_merge_recursive($phpRec, $phpAll);
	echo json_encode($newArr);
 ?>