<?php
require_once('dbconnect.php');
require_once('smtp.php');

if(isset($_REQUEST['func'])){
	$func=$_REQUEST['func'];
	switch($func)
	{
		case signup:signup();break;
		case autopsw:getautopsw();break;
		case changepsw:changepsw();break;
		case activatemail:activatemail();break;
		default:echo 'Error.';
	}
}

function signup(){
	$email=$_POST['email'];
	$nickname=$_POST['nickname'];
	$query="SELECT * FROM `user` WHERE email='$email'";
	$result=mysql_query($query);
	if (mysql_num_rows($result)==0){
		$hash=md5($email);
		srand((double)microtime()*1000000);
		$_SESSION['autopsw'] = rand(100000,999999);
		$password=md5($hash.$_SESSION['autopsw']);
		$query="INSERT INTO user (email,password,hash,regtime) VALUES ('$email','$password','$hash',now())";
		$result=mysql_query($query);
		$uid=mysql_insert_id();
		
		$query="INSERT INTO profile (uid,nickname,avatar) VALUES ('$uid','$nickname','sysUserPic/user.gif')";
		$result=mysql_query($query);
		
		$_SESSION['email']=$email;
		$_SESSION['password']=$password;
		$_SESSION['uid']=$uid;
		$query="SELECT * FROM `profile` WHERE uid='$uid'";
		$result=mysql_query($query);
		while ($row=mysql_fetch_array($result)){
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
		}
		echo '0';
	} else echo 'mysql_num_rows($result)=='.mysql_num_rows($result).'  $email='.$email;
}
function getautopsw(){
	echo $_SESSION['autopsw'];
}

function changepsw(){
	$email=$_SESSION['email'];
	$newpsw=$_POST['newpsw'];
	$password=md5(md5($email).$newpsw);
	$query="UPDATE user SET password='$password' WHERE email='$email'";
	$result=mysql_query($query);
	if (mysql_affected_rows()==1){
		$_SESSION['password']=$password;
		$_SESSION['autopsw']=$newpsw;
		echo '0';
	} else echo '1';
}

function activatemail(){
	$content=
		'尊敬的用户：<br />
		你好！<br />
		你的邮箱 '.$_SESSION['email'].' 刚在 易易网 （Yeeyee.net）注册成功。<br />
		你的密码： '.$_SESSION['autopsw'].'<br />
		
		如果你确实自己已在易易网注册了账号，请点击以下地址以激活账户：<br />
		http://yeeyee.net/service/activate.php?hash='.md5($_SESSION['email']).'<br />
		
		如果你不确认是否自己曾在易易网注册过，或认为自己的邮箱被冒用，请与易易网管理员联系：<br />
		admin@yeeyee.net<br />
		
		祝你在易易网上旅途愉快<br />
		'.date('Y-m-d G:i:s').'
	';
	$to=$_SESSION['email'];
	$subject='Yeeyee.net:You have registered successfully!';
	signupmail($to,$subject,$content);
	unset($_SESSION['autopsw']);
} 
?>