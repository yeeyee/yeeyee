<?php
require('dbconnect.php');

//session_start();
if(isset($_REQUEST['func'])){
	$func=$_REQUEST['func'];
	switch($func)
	{
		case showsign:showsign();break;
		case checklogin:checklogin();break;
		case loadLoginForm:loadLoginForm();break;
		case login:login();break;
		case logout:logout();break;
		case loadProfile:loadProfile();break;
		case firstGuiding:firstGuiding();break;
		default:echo 'Error.';
	}
	
}
function showsign(){
	if (!isset($_SESSION['password'])){
		echo 1;
	}
}

function checklogin(){
	if (!isset($_SESSION['password'])){
		echo 0;
	}else{		
		$arr=array(
			'avatar'=>$_SESSION['avatar'],
			'nickname'=>$_SESSION['nickname']
		);
		echo json_encode($arr);
	}
}

function loadLoginForm(){
	if (!isset($_SESSION['password'])){
		echo 1;
	}else{
		echo 0;
	}
}

function login(){
	$email=escape_data($_REQUEST['email']);
	$password=md5(md5($email).escape_data($_REQUEST['password']));
	$query="SELECT * FROM user WHERE (email='$email' AND password='$password')";
	$result=mysql_query($query);
	if (mysql_num_rows($result)==1){
		$_SESSION['email']=$email;
		$_SESSION['password']=$password;
		
		while ($row=mysql_fetch_array($result)){
			$_SESSION['uid']=$row['uid'];
			
		}
		$uid=$_SESSION['uid'];
		$query2="SELECT * FROM profile WHERE uid='$uid'";
		$result2=mysql_query($query2);
		while ($row=mysql_fetch_array($result2)){
			$_SESSION['signintimes']=$row['signintimes'];
			$_SESSION['uid']=$row['uid'];
		}	
		
		//载入登录次数	
		$uid=$_SESSION['uid'];
		$signintimes2=$_SESSION['signintimes']+1;
		$query="UPDATE profile SET signintimes='$signintimes2' WHERE uid='$uid'";
		$result=mysql_query($query);
		
		loadProfile();
		//echo "1";
	}else{
		echo 0;
	}
}

function logout(){
	session_destroy();
	if (isset($_COOKIE['password'])){
		cookie_destroy("password");
	}
	echo 1;
}

function loadProfile(){
	$uid=$_SESSION['uid'];
	$query="SELECT a.*,b.* FROM profile AS a,user AS b WHERE a.uid='$uid' AND b.uid='$uid'";
	$result=mysql_query($query);
	while ($row=mysql_fetch_array($result)){
		$_SESSION['avatar']=$row['avatar'];
		$_SESSION['nickname']=$row['nickname'];
		$_SESSION['phone']=$row['phone'];
		$_SESSION['shortnum']=$row['shortnum'];
		$_SESSION['qq']=$row['qq'];
		$_SESSION['weibo']=$row['weibo'];
		$_SESSION['renren']=$row['renren'];
		$_SESSION['realname']=$row['realname'];
		$_SESSION['grade']=$row['grade'];
		$_SESSION['degree']=$row['degree'];
		$_SESSION['college']=$row['college'];
		$_SESSION['major']=$row['major'];
		$_SESSION['note']=$row['note'];
		$_SESSION['auth']=$row['auth'];
		$_SESSION['signintimes']=$row['signintimes'];
		$_SESSION['selectedCategory']=99;
		
		$arrayBig=array(
		'email'=>$row['email'],
		'avatar'=>$row['avatar'],
		'nickname'=>$row['nickname'],
		'phone'=>$row['phone'],
		'shortnum'=>$row['shortnum'],
		'qq'=>$row['qq'],
		'weibo'=>$row['weibo'],
		'renren'=>$row['renren'],
		'realname'=>$row['realname'],
		'grade'=>$row['grade'],
		'degree'=>$row['degree'],
		'college'=>$row['college'],
		'major'=>$row['major'],
		'note'=>$row['note'],
		'auth'=>$row['auth'],
		'signintimes'=>$row['signintimes']
		);
	}
	
	$json_str=json_encode($arrayBig);
	echo $json_str;
}

function firstGuiding(){
	$uid=$_SESSION['uid'];
	$signintimes2=$_SESSION['signintimes']+1;
	$query="UPDATE profile SET signintimes='$signintimes2' WHERE uid='$uid'";
	$result=mysql_query($query);
	
	echo '<script type="text/javascript">
			signintimes='.$_SESSION['signintimes'].'
		 </script>
			';
}
?>