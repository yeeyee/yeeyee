<?php
require_once('dbconnect.php');
require_once('smtp.php');

if(isset($_REQUEST['func'])){
	$uid=$_SESSION['uid'];
	$func=$_REQUEST['func'];
	switch($func)
	{
		case loadstream:loadStream();break;

		case post:post();break;
		case loaddetail:loadDetail();break;
		case targetprofile:targetprofile();break;
		case sendemail:sendemail();break;
		case loadcategorylist:loadCategoryList();break;
		
		case delete:delete();break;
		case withdraw:withdraw();break;
		
		case loadsms:loadsMessages();break;
		case loadmessagebox:loadMessageBox();break;
		case sendsmessages:sendsMessages();break;
		case reloadmessagebox:reloadMessageBox();break;
		default:echo 'Error.';
	}
}

function loadStream(){
	$cardPointer=$_REQUEST['cardPointer'];
	$cardStep=$_REQUEST['cardStep'];
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
		$searchKey=escape_data($_REQUEST['searchKey']);
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
	
	$query="SELECT a.*, b.*, c.* FROM profile AS a, `".$stream_type."` AS b, ".$category_type." AS c WHERE  a.uid = b.uid AND b.cid = c.cid AND b.status=0 ".$cidQuery.$searchQuery.$authQuery.$methodQuery." ORDER BY b.sid desc LIMIT $cardPointer,$cardStep";

	$result=mysql_query($query);
	
	$arr=array();
	while ($row=mysql_fetch_array($result)){
		$arr[$row['sid']]=array(
			'sid'=>$row['sid'],
			'uid'=>$row['uid'],
			'name'=>$row['name'],
			
			'descp'=>eregi_replace('&amp;lt;br /&amp;gt;','<br />',$row['descp']),
			
			'price'=>$row['price'],
			
			'pic'=>$row['pic'],
			'time'=>$row['time'],
			'cid'=>$row['cid'],
			'cname'=>$row['cname'],
			'clicktimes'=>$row['clicktimes'],
			'method'=>$row['method'],
			'href'=>$row['href'],
			'withdrawX'=>0,
			
			'avatar'=>$row['avatar'],
			'auth'=>$row['auth'],
			'nickname'=>$row['nickname']
		);
		if ($row['uid']==$_SESSION['uid']){
			$arr[$row['sid']]['withdrawX']=1;
		}
	}
	
	echo json_encode($arr);
}

function post(){
	$uid=$_SESSION['uid'];
	$query="SELECT * FROM `user` WHERE uid='$uid'";
	$result=mysql_query($query);
	$row=mysql_fetch_array($result);
	$type=$_REQUEST['type'];
	switch($type){
		case 1:
			$stream_type='stream_items';
			break;
		case 2:
			$stream_type='stream_school';
			break;
		case 3:
			$stream_type='stream_items';
			break;
		case 4:
			$stream_type='stream_booksrolling';
			break;
	}
	if ($row['activate']=='y')
	{
		$name=escape_data($_REQUEST['name']);
		$descp=escape_data($_REQUEST['descp']);
		$descp=str_replace("&lt;br /&gt;","&amp;lt;br /&amp;gt;",$descp);
		
		$href=escape_data($_REQUEST['href']);
		$price=escape_data($_REQUEST['price']);
		$cid=escape_data($_REQUEST['cid']);
		$pic=escape_data($_REQUEST['pic']);
		$uishop=escape_data($_REQUEST['uishop']);
		$query="INSERT INTO ".$stream_type." (uid,name,descp,price,time,cid,pic,method,href) VALUES ('$uid','$name','$descp','$price',now(),'$cid','$pic','$uishop','$href')";
		$result=mysql_query($query);
		echo 0;
	}else echo 1;
}

function loadDetail(){
	$uid=$_SESSION['uid'];
	$sid=$_REQUEST['sid'];
	$_SESSION['sid']=$sid;
	$type=$_REQUEST['type'];
	switch($type){
		case 1:
			$stream_type='stream_items';
			break;
		case 2:
			$stream_type='stream_school';
			break;
		case 3:
			$stream_type='stream_items';
			break;
		case 4:
			$stream_type='stream_booksrolling';
			break;
	}
	$query="SELECT a.nickname, a.avatar, a.auth, b.* FROM `profile` AS a, `".$stream_type."` AS b WHERE a.uid = b.uid AND b.sid='$sid'";
	$result=mysql_query($query);
	
	$arr=array();
	while ($row=mysql_fetch_array($result)){
		$arr=array(
			'avatar'=>$row['avatar'],
			'nickname'=>$row['nickname'],
			'pic'=>$row['pic'],
			'price'=>$row['price'],
			'descp'=>eregi_replace('&amp;lt;br /&amp;gt;','<br />',$row['descp']),
			'method'=>$row['method'],	
			'uid'=>$row['uid'],
			'sid'=>$row['sid'],
			'auth'=>$row['auth']
		);
	}
	
	echo json_encode($arr);
	
}

function sendemail(){
	$uid=$_SESSION['uid'];
	$sid=$_SESSION['sid'];
	$email=escape_data($_REQUEST['email']);
	$phone=escape_data($_REQUEST['phone']);
	$shortnum=escape_data($_REQUEST['shortnum']);
	$realname=escape_data($_REQUEST['realname']);
	$qq=escape_data($_REQUEST['qq']);
	$weibo=escape_data($_REQUEST['weibo']);
	$renren=escape_data($_REQUEST['renren']);
	$note=escape_data($_REQUEST['note']);
	$type=$_REQUEST['type'];
	switch($type){
		case 1:
			$stream_type='stream_items';
			break;
		case 2:
			$stream_type='stream_school';
			break;
		case 3:
			$stream_type='stream_items';
			break;
		case 4:
			$stream_type='stream_booksrolling';
			break;
	}
	$query="SELECT c.*, a.*, b.* FROM `user` AS a, `".$stream_type."` AS b, `profile` AS c WHERE a.uid=b.uid AND b.sid='$sid' AND c.uid=b.uid";
	$result=mysql_query($query);
	while ($row=mysql_fetch_array($result)){
		$content='
			尊敬的用户'.$row['nickname'].' （'.$row['email'].'）：<br />
			你好。有用户对你在易易网（yeeyee.net）上发布的物品“ '.$row['name'].' ”感兴趣！请你尽快与之联系！<br />
			
			用户：'.$_SESSION['nickname'].'（'.$_SESSION['email'].'）<br />
			手机：'.$phone.'（短号：'.$shortnum.'）<br />
			姓名：'.$realname.'<br />
			QQ：'.$qq.'<br />
			微博：'.$weibo.'<br />
			人人：'.$renren.'<br />
			
			备注：'.$note.'<br />
			
			祝双方交易愉快！<br />
			易易网<br />
			'.date('Y-m-d G:i:s').'
		';
		$to=$row['email'];
		$subject='易易网：有人对你发布的信息感兴趣了！';

		
		
		$_SESSION['target_sid']=$sid;
		$_SESSION['target_email']=$row['email'];
		
		$target_uid=$row['uid'];//////////////////
		$tempnickname=$row['nickname'];
	}
	
	$query="INSERT INTO message_record (uid,sid,time) VALUES ('$uid','$sid',now())";
	$result=mysql_query($query);
	
	$content="系统信息：我（".$_SESSION['nickname']."）对你（".$tempnickname."）的物品感兴趣，详情请参考系统发出的邮件！";
	$query="INSERT INTO sms (sender,receiver,content,time) VALUES ('$uid','$target_uid','$content',NOW())";
	$result=mysql_query($query);
	
	if(sellmail($to,$subject,$content)){
		echo 1;
	}else{
		echo 0;
	};
}

function targetprofile(){
	$type=$_REQUEST['type'];
	$sid=$_SESSION['target_sid'];
	$email=$_SESSION['target_email'];
	
	switch($type){
		case 1:
			$stream_type='stream_items';
			break;
		case 2:
			$stream_type='stream_school';
			break;
		case 3:
			$stream_type='stream_items';
			break;
		case 4:
			$stream_type='stream_booksrolling';
			break;
	}
	
	$query="SELECT * FROM `profile` AS a , `".$stream_type."` AS b WHERE b.sid='$sid' AND a.uid=b.uid";
	$result=mysql_query($query);
	
	$arr=array();
	while ($row=mysql_fetch_array($result)){
		$arr=array(
			'avatar'=>$row['avatar'],
			'nickname'=>$row['nickname'],
			'pic'=>$row['pic'],
			'price'=>$row['price'],
			'descp'=>$row['descp'],
			'method'=>$row['method'],	
			'uid'=>$row['uid'],
			'auth'=>$row['auth'],
			
			'email'=>$_SESSION['target_email'],
			'sid'=>$_SESSION['target_sid'],
			
			'phone'=>$row['phone'],
			'realname'=>$row['realname'],
			'qq'=>$row['qq'],
			'shortnum'=>$row['shortnum'],
			'weibo'=>$row['weibo'],
			'renren'=>$row['renren'],
			'note'=>$row['note'],
			
			'emailstatus'=>0
		);
		
		$content='
			尊敬的用户'.$_SESSION['nickname'].' （'.$_SESSION['email'].'）：<br />
			你好。你在易易网（yeeyee.net）上对 '.$row['nickname'].'（'.$email.'） 发布的物品“ '.$row['name'].' ”感兴趣！请你尽快与之联系！<br />
			
			用户：'.$row['nickname'].'（'.$email.'）<br />
			手机：'.$row['phone'].'（短号：'.$row['shortnum'].'）<br />
			姓名：'.$row['realname'].'<br />
			微博：'.$row['weibo'].'<br />
			人人：'.$row['renren'].'<br />
			
			备注：'.$row['note'].'<br />
			
			祝双方交易愉快！<br />
			易易网<br />
			'.date('Y-m-d G:i:s').'
		';
		$to=$_SESSION['email'];
		$subject='易易网：你对这个信息感兴趣，尽快联系TA吧！';
		
		$uid=$row['uid'];//////////////////
		$target_uid=$_SESSION['uid'];
		$content2="系统信息：我（".$row['nickname']."）收到你（".$_SESSION['nickname']."）的联系了，详情请参考系统发出的邮件！";
		$query2="INSERT INTO sms (sender,receiver,content,time) VALUES ('$uid','$target_uid','$content2',NOW())";
		$result2=mysql_query($query2);
		if(buymail($to,$subject,$content)){
			$arr['emailstatus']=1;
		};
	}
	echo json_encode($arr);

}

function loadCategoryList(){
	$type=$_REQUEST['type'];
	$method=$_REQUEST['method'];
	$searchKey=$_REQUEST['searchKey'];
	$auth=$_REQUEST['auth'];
	
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
	$query="SELECT * FROM ".$category_type." ORDER BY cid ";
	$result=mysql_query($query);
	
	if($searchKey!="yeenosearch"){
		$searchKey=escape_data($_REQUEST['searchKey']);
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
	
	$arr=array();
	while ($row=mysql_fetch_array($result)){
		$cid=$row['cid'];
		$cidQuery=" AND cid='$cid'";
		$query2="SELECT a.uid, b.uid FROM profile AS a, ".$stream_type." AS b WHERE  a.uid = b.uid AND b.status=0 ".$cidQuery.$searchQuery.$authQuery.$methodQuery;
		
		$r=mysql_query($query2);
		$num=mysql_num_rows($r);
		
		$arr[$row['cid']]=array(
			'cid'=>$row['cid'],
			'cname'=>$row['cname'],
			'num'=>$num
		);
		
	}
	echo json_encode($arr);
}

function delete() {
    $delete_id=$_REQUEST['id'];
	$type=$_REQUEST['type'];
	switch($type){
		case 1:
			$stream_type='stream_items';
			break;
		case 2:
			$stream_type='stream_school';
			break;
		case 3:
			$stream_type='stream_items';
			break;
		case 4:
			$stream_type='stream_booksrolling';
			break;
	}
	
	if(!filter_var($delete_id, FILTER_VALIDATE_INT)) {//判断id是否为int
	    return $delete_id;
	}else{
		$query0="SELECT * FROM `profile` AS a , `".$stream_type."` AS b WHERE b.sid='$delete_id' AND a.uid=b.uid";
		$result0=mysql_query($query0);
		while ($row=mysql_fetch_array($result0)){
			$targetPath=$_SERVER['DOCUMENT_ROOT'] . '/uploads/itemspic/'.$row['pic'];
		}
		unlink($targetPath);
	    $query="DELETE FROM `".$stream_type."` WHERE sid=".$delete_id;
		$result=mysql_query($query) or die('1');
		return $result;
	}
}

function withdraw() {
    $sid=$_REQUEST['sid'];
	$type=$_REQUEST['type'];
	switch($type){
		case 1:
			$stream_type='stream_items';
			break;
		case 2:
			$stream_type='stream_school';
			break;
		case 3:
			$stream_type='stream_items';
			break;
		case 4:
			$stream_type='stream_booksrolling';
			break;
	}
	$query="UPDATE profile AS a, ".$stream_type." AS b SET status=1 WHERE b.sid='$sid' AND a.uid=b.uid";
	$result=mysql_query($query) or die('1');
	echo 1;
}

function loadMessageBox(){
	$target_uid=$_REQUEST['uid'];
	$my_uid=$_SESSION['uid'];
	$query="SELECT * FROM profile WHERE uid='$target_uid'";
	$result=mysql_query($query);
	$row=mysql_fetch_array($result);
	
	$query="UPDATE sms SET `read`='y' WHERE (sender='$target_uid' AND receiver='$my_uid')";
	$result=mysql_query($query);
	$query="SELECT * FROM sms WHERE (sender='$target_uid' AND receiver='$my_uid') OR (receiver='$target_uid' AND sender='$my_uid') ORDER BY time";
	
	$result=mysql_query($query);
	$arr=array();
	while($row2=mysql_fetch_array($result)){
		if ($row2['sender']==$_SESSION['uid']){
			$arr[$row2['smsid']]=array(
				'smsid'=>$row2['smsid'],
				'nickname'=>$_SESSION['nickname'],			
				'avatar'=>$_SESSION['avatar'],
				'time'=>$row2['time'],
				'content'=>$row2['content'],
				
				'me'=>1
			);
		}else{
			$arr[$row2['smsid']]=array(
				'smsid'=>$row2['smsid'],
				'nickname'=>$row['nickname'],			
				'avatar'=>$row['avatar'],
				'time'=>$row2['time'],
				'content'=>$row2['content'],
				
				'me'=>0
			);
		}		
	};
	echo json_encode($arr);
}

function sendsMessages(){
	$target_uid=$_REQUEST['uid'];
	$my_uid=$_SESSION['uid'];
	$content=escape_data($_REQUEST['content']);
	$query="INSERT INTO sms (sender,receiver,content,time) VALUES ('$my_uid','$target_uid','$content',NOW())";
	$result=mysql_query($query);
	echo 0;
}

function reloadMessageBox(){
	$target_uid=$_REQUEST['uid'];
	$my_uid=$_SESSION['uid'];
	$query="SELECT * FROM profile WHERE uid='$target_uid'";
	$result=mysql_query($query);
	$row=mysql_fetch_array($result);
	$query="SELECT * FROM sms WHERE (sender='$target_uid' AND receiver='$my_uid') OR (receiver='$target_uid' AND sender='$my_uid') ORDER BY time";
	
	$result=mysql_query($query);
	$arr=array();
	while($row2=mysql_fetch_array($result)){
		if ($row2['sender']==$_SESSION['uid']){
			$arr[$row2['smsid']]=array(
				'smsid'=>$row2['smsid'],
				'nickname'=>$_SESSION['nickname'],			
				'avatar'=>$_SESSION['avatar'],
				'time'=>$row2['time'],
				'content'=>$row2['content'],
				
				'me'=>1
			);
		}else{
			$arr[$row2['smsid']]=array(
				'smsid'=>$row2['smsid'],
				'nickname'=>$row['nickname'],			
				'avatar'=>$row['avatar'],
				'time'=>$row2['time'],
				'content'=>$row2['content'],
				
				'me'=>0
			);
		}		
	};
	echo json_encode($arr);
}

function loadsMessages(){
	$my_uid=$_SESSION['uid'];
	$query="SELECT * FROM sms AS a, profile AS b WHERE a.receiver='$my_uid' AND a.read='n' AND a.sender=b.uid ORDER BY sender";
	$result=mysql_query($query);
	$previous='0';
	//$return='';
	
	$arr=array();
	while ($row=mysql_fetch_array($result)){
		if ($row['sender']!=$previous) {
			//$return.='addsMessages_name(\''.$row['nickname'].'\','.$row['uid'].');';
			$previous=$row['sender'];
			
			$arr[$row['uid']]=array(
				'nickname'=>$row['nickname'],			
				'uid'=>$row['uid'],
				'auth'=>$row['auth']
			);
		}
		
	}
	echo json_encode($arr);
}
?>