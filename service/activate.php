<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="refresh" content="3;url=../index.html" />
</head>
<body>
<?
require_once('dbconnect.php');

$hash=$_REQUEST['hash'];
$query="SELECT * FROM user WHERE hash='$hash'";
$result=mysql_query($query);
if(mysql_num_rows($result)==1){
	$query="UPDATE user SET activate='y' WHERE hash='$hash'";
	$result=mysql_query($query);
	if (mysql_affected_rows()==1){
		echo '激活成功。<a href="/index.html">点击此处进入易易网</a>';
	} else {
		echo '你的账户已激活，或激活码出错~~~~(>_<)~~~~ ';
	}
} else {
	echo '激活码出错，激活失败~~~~(>_<)~~~~ ';
}

?>
<p>页面将在3秒后自动跳转到易易主页。</p>
</body>
</html>