<?
require_once('dbconnect.php');
require_once('smtp.php');

if (isset($_POST['findEmail']))
{
	$email=$_POST['findEmail'];
	$query="SELECT * FROM user WHERE email='$email'";
	$result=mysql_query($query);
	if (mysql_num_rows($result)==1){
		$hash=md5($email);
		srand((double)microtime()*1000000);
		$autopsw = rand(100000,999999);
		$password=md5($hash.$autopsw);
		$query="UPDATE user SET password='$password' WHERE email='$email'";
		$result=mysql_query($query);
		if (mysql_affected_rows()==1){
			$content=
			'尊敬的用户：<br />
			你好！<br />
			你在易易网的账号 '.$email.' 的密码已被重置。<br />
			你的新密码： '.$autopsw.'<br />
					
			如果新密码无法使用，请与易易网管理员联系：<br />
			admin@yeeyee.net<br />
			
			请注意，易易网工作人员不会主动询问你的密码。<br />
			
			祝你在易易网上旅途愉快<br />
			'.date('Y-m-d G:i:s').'
		';
		$to=$email;
		$subject='易易网：密码已被重置，记得回易易网亲自修改！';
		passwdmail($to,$subject,$content);
		} else {
			echo '重置密码失败。请与管理员联系： admin@yeeyee.net';
		}
	} else {
		echo '没有找到此邮箱。';
	}
}
?>