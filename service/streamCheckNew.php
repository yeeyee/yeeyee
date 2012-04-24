<?php
require_once('dbconnect.php');
require_once('smtp.php');

if(isset($_REQUEST['func'])){
	$uid=$_SESSION['uid'];
	$func=$_REQUEST['func'];
	switch($func)
	{
		case loadStreamCheck:loadStreamCheck();break;
		default:echo 'Error.';
	}
}
function loadStreamCheck(){
	$cid=$_REQUEST['cid'];
	$type=$_REQUEST['type'];
	$method=$_REQUEST['method'];
	$searchKey=$_REQUEST['searchKey'];
	$auth=$_REQUEST['auth'];
	
	if($cid==0){
		$cidQuery=" AND 1 ";
	}else{
		$cidQuery=" AND b.cid='$cid' ";
	}
	switch($type){
		case 1:
			$category_type="category_items";
			$stream_type='stream_items';
			break;
		case 2:
			$category_type="category_school";
			$stream_type='stream_school';
			break;
		case 3:
			$category_type="category_items";
			$stream_type='stream_items';
			break;
		case 4:
			$category_type="category_booksrolling";
			$stream_type='stream_booksrolling';
			break;
	}
	
	if($searchKey!="yeenosearch"){

		$searchQuery=" And (b.name LIKE '%$searchKey%' OR b.descp LIKe '%$searchKey%') ";
	}else{
		$searchQuery=" AND 1 ";
	}
	
	if($auth==1){
		$authQuery=" AND a.auth='y' ";
	}else if($auth==0){
		$authQuery=" AND 1 ";
	}else{
		$authQuery=" AND b.uid=".$auth." ";
	}
	
	if($method==1){
		$methodQuery=" AND b.method='1' ";
	}else{
		$methodQuery=" AND 1 ";
	}
	
	$query="SELECT a.*, b.*, c.* FROM profile AS a, `".$stream_type."` AS b, ".$category_type." AS c WHERE  a.uid = b.uid AND b.cid = c.cid AND b.status=0 ".$cidQuery.$searchQuery.$authQuery.$methodQuery;

	$result=mysql_query($query);
	$maxNow=mysql_num_rows($result);
	echo $maxNow;
}


?>