<?
require('dbconnect.php');

if(isset($_REQUEST['func'])){
	$uid=$_SESSION['uid'];
	$func=$_REQUEST['func'];
	switch($func)
	{
		case save1:save1();break;
		case save2:save2();break;
		case save3:save3();break;
		case save4:save4();break;
		case savepassword:savePassword();break;
		case profile:profile();break;
		default:echo 'Error.';
	}
}
function profile(){
	$arr=array(
		'nickname'=>$_SESSION['nickname'],
		'email'=>$_SESSION['email'],
		'signintimes'=>$_SESSION['signintimes'],
		
		'phone'=>$_SESSION['phone'],
		'shortnum'=>$_SESSION['shortnum'],
		'qq'=>$_SESSION['qq'],
		'weibo'=>$_SESSION['weibo'],
		'renren'=>$_SESSION['renren'],
		
		'realname'=>$_SESSION['realname'],
		'grade'=>$_SESSION['grade'],
		'degree'=>$_SESSION['degree'],
		'college'=>$_SESSION['college'],
		'major'=>$_SESSION['major'],
		'note'=>$_SESSION['note'],
		
		'auth'=>$_SESSION['auth']
	);
	echo json_encode($arr);


}

function save1(){
	$uid=$_SESSION['uid'];
	$nickname=escape_data($_POST['nickname']);
	$query="UPDATE profile SET nickname='$nickname' WHERE uid='$uid'";
	$result=mysql_query($query);
	if (mysql_affected_rows()==1){
		echo '0';
		$_SESSION['nickname']=$nickname;
	} else {
		echo '1'." mysql_affected_rows()=".mysql_affected_rows();
	}
}

function save2(){
	$uid=$_SESSION['uid'];
	$avatar=$_POST['filename'];
	if($_SESSION['avatar']!="sysUserPic/user.gif"){
	$targetPath = $_SERVER['DOCUMENT_ROOT'] . '/uploads/userspic/'.$_SESSION['avatar'];
	unlink($targetPath);
	}
	$query="UPDATE profile SET avatar='$avatar' WHERE uid='$uid'";
	$result=mysql_query($query);
	if (mysql_affected_rows()==1){
		echo '0';
		$_SESSION['avatar']=$avatar;
		
	} else {
		echo '1'." mysql_affected_rows()=".mysql_affected_rows();
	}
}

function save3(){
	$uid=$_SESSION['uid'];
	$phone=escape_data($_POST['phone']);
	$shortnum=escape_data($_POST['shortnum']);
	$qq=escape_data($_POST['qq']);
	$weibo=escape_data($_POST['weibo']);
	$renren=escape_data($_POST['renren']);
	$query="UPDATE profile SET phone='$phone',shortnum='$shortnum',qq='$qq',weibo='$weibo',renren='$renren' WHERE uid='$uid'";
	$result=mysql_query($query);
	if (mysql_affected_rows()==1){
		echo '0';
		$_SESSION['phone']=$phone;
		$_SESSION['shortnum']=$shortnum;
		$_SESSION['qq']=$qq;
		$_SESSION['weibo']=$weibo;
		$_SESSION['renren']=$renren;
	} else {
		echo '1'." mysql_affected_rows()=".mysql_affected_rows();
	}
}

function save4(){
	$uid=$_SESSION['uid'];
	$realname=escape_data($_POST['realname']);
	$grade=escape_data($_POST['grade']);
	$degree=escape_data($_POST['degree']);
	$college=escape_data($_POST['college']);
	$major=escape_data($_POST['major']);
	$note=escape_data($_POST['note']);
	$query="UPDATE profile SET realname='$realname',grade='$grade',degree='$degree',college='$college',major='$major',note='$note' WHERE uid='$uid'";
	$result=mysql_query($query);
	if (mysql_affected_rows()==1){
		echo '0';
		$_SESSION['realname']=$realname;
		$_SESSION['grade']=$grade;
		$_SESSION['degree']=$degree;
		$_SESSION['college']=$college;
		$_SESSION['major']=$major;
		$_SESSION['note']=$note;
	} else {
		echo '1'." mysql_affected_rows()=".mysql_affected_rows();
	}
}

function savePassword(){
	$uid=$_SESSION['uid'];
	$email=$_SESSION['email'];
	$old=escape_data($_POST['old']);
	$new=escape_data($_POST['new']);
	$check=md5(md5($email).$old);
	if ($check != $_SESSION['password']) echo '1';
	else{
		$new=md5(md5($email).$new);
		$query="UPDATE user SET password='$new' WHERE uid='$uid'";
		$result=mysql_query($query);
		if (mysql_affected_rows()==1){
			echo '0';
			$_SESSION['password']=$new;
		} else echo '2';
	}
}
?>