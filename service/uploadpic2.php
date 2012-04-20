<?php
if(isset($_REQUEST['func'])){
	$func=$_REQUEST['func'];
	switch($func)
	{
		case cancelPic:cancelPic();break;
	}
}
function cancelPic(){
	$file=$_REQUEST['file'];
	$targetFolder = '/uploads'; 
	$targetPath = $_SERVER['DOCUMENT_ROOT'] . $targetFolder . '/userspic/';
	$targetFile = str_replace('//','/',$targetPath) . $file;
	unlink($targetFile);
	exit(0);
}

	$targetFolder = '/uploads'; 
	$tempFile = $_FILES['uploadfile']['tmp_name'];
	$targetPath = $_SERVER['DOCUMENT_ROOT'] . $targetFolder . '/userspic/';
	
	$file = $_FILES['uploadfile']['name'];
	$file = utf8_decode($file);
	$file = strtolower($file);
	
	$fileTypeExts = '*.jpg;*.png;*.gif';	
	if (isset($fileTypeExts)) {
		$fileTypes = str_replace('*.','',$fileTypeExts);
		$fileTypes = str_replace(';','|',$fileTypes);
		$typesArray = split('\|',$fileTypes);
		$fileParts = pathinfo($file);
		if (!in_array($fileParts['extension'],$typesArray)){
			die('File type not allowed!');
		}
	}
			
	
	$file=md5($file).'.'.$fileParts['extension'];
	$aux_targetFile = str_replace('//','/',$targetPath);
	$targetFile = str_replace('//','/',$targetPath) . $file;
		
		
	$checkExisting = $_REQUEST['checkExisting'];
	if (!isset($checkExisting) && file_exists($targetFile)){
		while ($ok != true) {
			if(file_exists($targetFile)) {
				$ok = false;
				$rand = rand(100000, 999999);
				$targetFile = $aux_targetFile . $rand . '_' . $file;
			}else{
				$ok = true;
				$file = $rand . '_' . $file;
			}
		}
	}
	
	$sourcefile = $tempFile;
		
		
	//源图片宽高
	list($width, $height) = getimagesize($sourcefile);
	$oldbili=$width/$height;
		
	//目标宽度
	$newwidth = 500;
	//目标高度
	$newheight = $newwidth/$oldbili;
	//目标比例
	$newbili = $newwidth / $newheight;
		
	if($width / $height > $newbili){
	//原图较长
		$w = $width;
		$h = $height;
		$x = 0;
		$y = 0;
	}else{
		//原图较宽
		$w = $width;
		$h = $height;
		$x = 0;
		$y = 0;
	}
		
	$data = getimagesize($sourcefile);
	switch ($data['2']){
		case 1:
			$source = imagecreatefromgif($sourcefile);
			break;
		case 2:
			$source = imagecreatefromjpeg($sourcefile);
			break;
		case 3:
			$source = imagecreatefrompng($sourcefile);
			break;
		case 6:
			$source = imagecreatefromwbmp($sourcefile);
			break;
		} 
	$thumb = imagecreatetruecolor($newwidth, $newheight);
		
	imagecopyresized($thumb, $source, 0, 0, $x, $y, $newwidth, $newheight, $w, $h);
	imagejpeg($thumb, $tempFile);
		
		
	//session_start();
	//$_SESSION['targetFile']=$targetFile;
	
	if(move_uploaded_file($tempFile,$targetFile)){ 
		echo "$file";
	}else{
		echo 0;
	}

?>